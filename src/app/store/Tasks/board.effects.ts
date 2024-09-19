// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import * as BoardActions from './board.actions'
// import { catchError, mergeMap, map, of } from "rxjs";
// import { HttpClient } from "@angular/common/http";
// import { Board } from "../../model/model";

// @Injectable()
// export class BoardEffects {
//     constructor(private actions$: Actions, private http: HttpClient) {}

//     loadBoards$ = createEffect(() =>
//         this.actions$.pipe(
//             ofType(BoardActions.loadBoard),
//             mergeMap(() => {
//                 const storedBoards = JSON.parse(localStorage.getItem('boards') || '[]');

//                 if (storedBoards.length > 0) {
//                     return of(BoardActions.loadBoardSuccess({ boards: storedBoards }));
//                 } else {
//                     return this.http.get<Board[]>('/assets/data/data.json').pipe(
//                         map((boards) => {
//                             localStorage.setItem('boards', JSON.stringify(boards));
//                             return BoardActions.loadBoardSuccess({ boards });
//                         }),
//                         catchError((error) =>
//                             of(BoardActions.loadBoardFailure({ error: error.message }))
//                         )
//                     );
//                 }
//             })
//         )
//     );
// }

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as BoardActions from './board.actions';
import { BoardService } from '../../services/board/board.service';

@Injectable()
export class BoardEffects {
  constructor(private actions$: Actions, private boardService: BoardService) {}

  // Load boards effect
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardActions.loadBoard),
      mergeMap(() =>
        this.boardService.getBoards().pipe(
          map((boards) => BoardActions.loadBoardSuccess({ boards })),
          catchError((error) => of(BoardActions.loadBoardFailure({ error })))
        )
      )
    )
  );
}
