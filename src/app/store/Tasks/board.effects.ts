import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as BoardActions from './board.actions';
import { Board } from '../../model/model';

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
  
}

