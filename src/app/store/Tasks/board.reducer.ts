// import { createReducer, on } from '@ngrx/store';
// import * as BoardActions from './board.actions';
// import { Board } from '../../model/model';

// export interface BoardState {
//     boards: Board[];
//     loading: boolean;
//     error: string;
// }

// export const initialBoardState: BoardState = {
//     boards: [],
//     loading: false,
//     error: '',
// };

// export const boardReducer = createReducer(
//     initialBoardState,

//     on(BoardActions.loadBoard, state => ({ ...state, loading: true })),
//     on(BoardActions.loadBoardSuccess, (state, { boards }) =>  ({ ...state, boards, loading: false })),
//     on(BoardActions.loadBoardFailure, (state, { error }) => ({ ...state, error, loading: false })),
// )

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { Board } from '../../model/model';

export interface BoardState extends EntityState<Board> {
  loading: boolean;
  error: string;
}

export const boardAdapter: EntityAdapter<Board> = createEntityAdapter<Board>();

export const initialBoardState: BoardState = boardAdapter.getInitialState({
  loading: false,
  error: '',
});

export const boardReducer = createReducer(
  initialBoardState,

  on(BoardActions.loadBoard, state => ({ ...state, loading: true })),
  
  on(BoardActions.loadBoardSuccess, (state, { boards }) => 
    boardAdapter.setAll(boards, { ...state, loading: false })
  ),
  
  on(BoardActions.loadBoardFailure, (state, { error }) => 
    ({ ...state, error, loading: false })
  ),
);
