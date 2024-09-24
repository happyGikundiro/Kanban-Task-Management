import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as BoardActions from './board.actions';
import { Board, Task } from '../../model/model';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoards),
      mergeMap(() =>
        this.http.get<{ boards: Board[] }>('/assets/data/data.json').pipe(
          map((response) => BoardActions.loadBoardsSuccess({ boards: response.boards })),
          catchError((error) =>
            of(BoardActions.loadBoardsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addBoard),
      map(({ board }) => {
        return BoardActions.addBoardSuccess({ board });
      }),
      catchError((error) =>
        of(BoardActions.addBoardFailure({ error: error.message }))
      )
    )
  );

  updateBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.updateBoard),
      mergeMap(({ board }) =>
        of(board).pipe(
          map(updatedBoard => BoardActions.updateBoardSuccess({ board: updatedBoard })),
          catchError(error => of(BoardActions.updateBoardFailure({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.addTask),
      mergeMap(({ boardName, task }) =>
        of(BoardActions.addTaskSuccess({ boardName, task })).pipe(
          catchError(error => of(BoardActions.addTaskFailure({ error: error.message })))
        )
      )
    )
  );

}
