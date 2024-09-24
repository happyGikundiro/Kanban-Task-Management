import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { Observable, Subscription } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { Store } from '@ngrx/store';
import { Board } from '../../model/model';
import { selectActiveBoardName, selectAllBoards } from '../../store/Tasks/board.selectors';
import { addBoard, loadBoards, selectBoard } from '../../store/Tasks/board.actions';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  logoSrc: string = '';
  modeIconSrc: string = '';
  isMenuOpen: boolean = false;
  themeSubscription!: Subscription;
  
  @Input() isSidebarVisible = false;
  @Input() isLargeSidebarVisible = true;
  @Output() hideSidebar = new EventEmitter<void>();

  boardForm!: FormGroup;

  boards$: Observable<Board[]> = this.store.select(selectAllBoards);
  activeBoardName$: Observable<string | null> = this.store.select(selectActiveBoardName);

  onSelectBoard(boardName: string): void {
    this.store.dispatch(selectBoard({ boardName }));
  }

  constructor(private themeService: ThemeService, public modalService: ModalService, private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {

    this. initializeForm();

    this.updateLogoAndIcon();
    this.themeSubscription = this.themeService.getDarkModeStatus().subscribe((isDarkMode) => {
      this.updateLogoAndIcon(isDarkMode);
    });

    this.store.dispatch(loadBoards());

    this.store.dispatch(selectBoard({ boardName: 'Platform Launch' }));
  }

  updateLogoAndIcon(isDarkMode: boolean = this.themeService.isDarkMode()): void {
    this.logoSrc = this.themeService.getLogoPath();
    this.modeIconSrc = isDarkMode ? '/assets/Images/dark-toggle.svg' : '/assets/Images/light-toggle.svg';
  }

  toggleTheme(): void {
    this.themeService.toggleDarkMode();
  }

  toggleSidebar(): void {
    this.hideSidebar.emit();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  openAddBoardModal(): void {
    this.modalService.openModal('addBoard'); 
  }  

  initializeForm(): void {
    this.boardForm = this.fb.group({
      boardName: ['', Validators.required],
      columns: this.fb.array([this.createColumn()], Validators.required)
    });
  }

  get columns() {
    return this.boardForm.get('columns') as FormArray;
  }

  createColumn(): FormControl {
    return this.fb.control('', Validators.required);
  }

  addColumn() {
    this.columns.push(this.createColumn());
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  onSubmit() {
    if (this.boardForm.valid) {
      const newBoard: Board = {
        name: this.boardForm.value.boardName,
        columns: this.boardForm.value.columns.map((col: string) => ({ name: col }))
      };

      this.store.dispatch(addBoard({ board: newBoard }));
      this.boardForm.reset();
      this.modalService.closeModal();
    }
  }

}


