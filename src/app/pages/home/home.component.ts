import { Board,  Subtask, Task } from './../../model/model';
import { Component,Input, OnInit, } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as BoardActions from '../../store/Tasks/board.actions'
import { selectActiveBoard, selectAllBoards, selectBoardsError, selectBoardsLoading } from '../../store/Tasks/board.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  @Input() isLargeSidebarVisible!: boolean ;

  boards$!: Observable<Board[]>;
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;
  activeBoard$: Observable<Board | undefined> = this.store.select(selectActiveBoard);

  currentBoard: Board | undefined ;
  activeBoardSubscription!: Subscription;

  selectedTask: Task | null = {
    title: '',
    description: '',
    status: '',
    subtasks: [] 
  };

  isBoardMenuOpen = false;
  itemType: 'board' | 'task' = 'task';
  selectedBoard: Board | null = null;

  constructor(public modalService: ModalService, private store: Store) {}

  openTaskDetails(task: Task): void {
    this.selectedTask = {
      ...task,
      subtasks: task.subtasks || []
    };  
    this.modalService.openModal('taskDetails');
  }
   
  ngOnInit(): void {

    this.boards$ = this.store.select(selectAllBoards);
    this.loading$ = this.store.select(selectBoardsLoading);
    this.error$ = this.store.select(selectBoardsError);

    this.store.dispatch(BoardActions.loadBoards());

    this.activeBoardSubscription = this.activeBoard$.subscribe(board => {
      this.currentBoard = board;
    });
    
  }

  getCompletedSubtasksCount(subtasks: Subtask[]): number {
    return subtasks.filter(subtask => subtask.isCompleted).length;
  }

  toggleSubtaskCompletion(subtask: Subtask): void {
    subtask.isCompleted = !subtask.isCompleted;
  }

  onNewColumnClick() {
    this.modalService.openModal('editColumns');
  }

  openTaskmenuModal(): void {
    this.isBoardMenuOpen = !this.isBoardMenuOpen;
  }

  onEditTaskClick():void{
    this.modalService.openModal('edittask');
  }

  onDeleteTaskClick(): void {
    this.modalService.openModal('deleteTask');
  }

  cancelDeleteTask(): void{
    this.modalService.closeModal();
    this.isBoardMenuOpen = false;
  }
 
  onConfirmDeleteTask(): void {
    if (this.selectedTask && this.currentBoard) {
        this.store.dispatch(
            BoardActions.deleteTaskSuccess({ boardName: this.currentBoard?.name, task: this.selectedTask })
        );
        this.modalService.closeModal();
    }  
  }

}
