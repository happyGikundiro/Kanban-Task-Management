import { Board, Subtask } from './../../model/model';
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


  constructor(private modalService: ModalService, private store: Store) {}

  openAddColumnModal(){
    console.log("clicked")
    const taskData = {
      type: 'addColumn',
      boardId: 1,
    };
    this.modalService.openModal(taskData);
  }

  openTaskDetails(task: Board): void {
    const taskData = {
      type: 'taskDetails',
      task: task,
    };
    this.modalService.openModal(taskData);
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

}
