import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { Board } from './model/model';
import { Store } from '@ngrx/store';
import { ModalService } from './services/modal/modal.service';
import { selectActiveBoard } from './store/Tasks/board.selectors';

import * as BoardActions from '../../src/app/store/Tasks/board.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  isSidebarVisible = false;
  isLargeSidebarVisible = true;

  boardForm!: FormGroup;
  activeBoard$!: Observable<Board | undefined>;

  constructor(private fb: FormBuilder, private store: Store, public modalService: ModalService ) {}

  ngOnInit() {
    this.initializeForm();

    this.modalService.modalType$.subscribe(modalType => {
      if (modalType === 'editBoard' || modalType === 'editColumns') {
        this.activeBoard$.subscribe(board => {
          if (board) {
            this.populateForm(board);
          }
        });
      } else {
        this.resetForm();
      }
    });
  }

  initializeForm(){
    this.boardForm = this.fb.group({
      boardName: ['', Validators.required],
      columns: this.fb.array([])
    });
    this.activeBoard$ = this.store.select(selectActiveBoard);
  }

  private populateForm(board: Board) {
    this.boardForm.patchValue({ boardName: board.name });
    this.columns.clear();
    board.columns.forEach(column => this.addColumn(column.name));
  }

  private resetForm() {
    this.boardForm.reset();
    this.columns.clear();
  }

  get columns() {
    return this.boardForm.get('columns') as FormArray;
  }

  addColumn(name: string = '') {
    this.columns.push(this.fb.control(name, Validators.required));
  }

  removeColumn(index: number) {
    this.columns.removeAt(index);
  }

  onSubmit() {
    if (this.boardForm.valid) {
      this.activeBoard$.pipe(take(1)).subscribe(board => {
        let updatedColumns = this.boardForm.value.columns.map((name: string, index: number) => {
          const existingColumn = board?.columns[index];
          return {
            name,
            tasks: existingColumn ? existingColumn.tasks : []
          };
        });
  
        const boardData: Board = {
          name: this.boardForm.value.boardName,
          columns: updatedColumns
        };

        this.store.dispatch(BoardActions.updateBoard({ board: boardData }));
        this.modalService.closeModal();
      });
    }
  }
  
  handleMenuToggle(isOpen: boolean) {
    this.isSidebarVisible = isOpen;
  }

  toggleSidebar() {
    this.isLargeSidebarVisible = !this.isLargeSidebarVisible;    
  }
}
