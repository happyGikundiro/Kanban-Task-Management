import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { Board } from '../../model/model';

export interface BoardState {
  boards: Board[];
  loading: boolean;
  error: string | null;
  activeBoardName: string | null;
}

export const initialState: BoardState = {
  boards: [],
  loading: false,
  error: null,
  activeBoardName: null,
};

export const boardReducer = createReducer(
  initialState,
  on(BoardActions.loadBoards, (state) => ({ ...state, loading: true, error: null, })),

  on(BoardActions.loadBoardsSuccess, (state, { boards }) => ({...state, boards: boards, loading: false, error: null, })),

  on(BoardActions.loadBoardsFailure, (state, { error }) => ({...state, loading: false,error, })),

  on(BoardActions.selectBoard, (state, { boardName }) => ({...state, activeBoardName: boardName})),

  on(BoardActions.addBoard, (state) => ({ ...state, loading: true })),

  on(BoardActions.addBoardSuccess, (state, { board }) => {
    return { ...state, boards: [...state.boards, board], loading: false, error: null, };
  }),
  
  on(BoardActions.addBoardFailure, (state, { error }) => ({ ...state, loading: false, error, }))

);




