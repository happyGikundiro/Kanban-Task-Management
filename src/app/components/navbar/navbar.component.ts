import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable, Subscription, take } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { Store } from '@ngrx/store';
import { selectActiveBoard, selectAllBoards,} from '../../store/Tasks/board.selectors';
import { Board, Task } from '../../model/model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as BoardActions from '../../store/Tasks/board.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  logoSrc: string = '';
  isMenuOpen: boolean = false;
  @Output() menuToggle = new EventEmitter<boolean>();
  themeSubscription!: Subscription;

  activeBoard$: Observable<Board | undefined> = this.store.select(selectActiveBoard);
  boards$: Observable<Board[]> = this.store.select(selectAllBoards);
  isBoardMenuOpen = false;
  taskForm!: FormGroup;

  selectedBoard: Board | undefined;

  @Output() boardDelete = new EventEmitter<Board>();

  constructor(private themeService: ThemeService, public modalService: ModalService, private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeAddTaskForm();
    this.themeSubscription = this.themeService.getDarkModeStatus().subscribe(() => {
      this.updateLogo(); 
    });
    this.updateLogo();
  }

  updateLogo(): void {
    this.logoSrc = this.themeService.getLogoPath();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuToggle.emit(this.isMenuOpen); 
  }

  openAddTaskModal(): void {
    this.initializeAddTaskForm();
    this.modalService.openModal('addTask');
  }
  
  openBoardmenuModal(): void {
    this.isBoardMenuOpen = !this.isBoardMenuOpen;
  }

  onEditBoardClick() {
    this.modalService.openModal('editBoard');
  }

  initializeAddTaskForm(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      subtasks: this.fb.array([this.createSubtasks()]),
      status: ['', Validators.required],
    });
  }

  addTask(): void {
    this.taskForm.markAllAsTouched();

    if (this.taskForm.valid) { 
      const newTask: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        subtasks: this.taskForm.value.subtasks.map((subtask: string) => ({ 
          title: subtask, 
          isCompleted: false 
        })),
        status: this.taskForm.value.status,
      };
      
      this.activeBoard$.pipe(
        take(1) 
      ).subscribe({
        next: (activeBoard) => {
          if (activeBoard) {
            this.store.dispatch(BoardActions.addTask({ boardName: activeBoard.name, task: newTask }));
          } else {
            console.error('No active board found');
          }
        },
        error: (error) => console.error('Error getting active board', error)
      });

      this.modalService.closeModal();
    } else {
      console.log('Form is invalid', this.taskForm.errors);
    }
  }

  get Subtasks() {
    return this.taskForm.get('subtasks') as FormArray;
  }

  createSubtasks(): FormControl {
    return this.fb.control('', Validators.required);
  }

  addSubtasks() {
    this.Subtasks.push(this.createSubtasks());
  }

  removeSubtask(index: number) {
    this.Subtasks.removeAt(index);
  }

  onDeleteBoardClick(): void {
    this.activeBoard$.pipe(take(1)).subscribe((activeBoard) => {
        if (activeBoard) {
            this.selectedBoard = activeBoard;
            this.modalService.openModal('deleteBoard');
        } else {
            console.error('No active board found for deletion');
        }
    });
  }

  onConfirmDeleteBoard(): void {
    if (this.selectedBoard) {
      this.store.dispatch(BoardActions.deleteBoardSuccess({ boardName: this.selectedBoard.name }));

      this.boards$.pipe(take(1)).subscribe(boards => {
        const remainingBoards = boards.filter(board => board.name !== this.selectedBoard?.name);
        if (remainingBoards.length > 0) {
          const nextBoard = remainingBoards[0];
          this.store.dispatch(BoardActions.selectBoard({ boardName: nextBoard.name }));
          this.isBoardMenuOpen = false;
        } else {
          console.log('No boards left to select');
          this.isBoardMenuOpen = false;
        }
      });
    } else {
      console.error('No board selected for deletion');
    }
    this.modalService.closeModal();
  }
  
  cancelDelete(): void {
    this.modalService.closeModal();
    this.isBoardMenuOpen = false;
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
}
