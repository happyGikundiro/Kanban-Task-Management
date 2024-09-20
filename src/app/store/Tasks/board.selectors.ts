import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardState } from './board.reducer';

export const selectBoardState = createFeatureSelector<BoardState>('board');

export const selectAllBoards = createSelector(
  selectBoardState,
  (state: BoardState) => state.boards
);

export const selectBoardsLoading = createSelector(
  selectBoardState,
  (state: BoardState) => state.loading
);

export const selectBoardsError = createSelector(
  selectBoardState,
  (state: BoardState) => state.error
);

export const selectActiveBoardName = createSelector(
  selectBoardState,
  (state: BoardState) => state.activeBoardName
);

export const selectActiveBoard = createSelector(
  selectAllBoards,
  selectActiveBoardName,
  (boards, activeBoardName) => boards.find(board => board.name === activeBoardName)
);
