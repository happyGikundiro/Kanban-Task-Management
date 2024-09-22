import { Board,  Subtask, Task } from './../../model/model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

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

  selectedTask: Task | null = {
    title: '',
    description: '',
    status: '',
    subtasks: [] 
};;

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
  }

  getCompletedSubtasksCount(subtasks: Subtask[]): number {
    return subtasks.filter(subtask => subtask.isCompleted).length;
  }

  toggleSubtaskCompletion(subtask: Subtask): void {
    subtask.isCompleted = !subtask.isCompleted;
  }

}
