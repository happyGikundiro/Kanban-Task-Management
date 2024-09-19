// import { createFeatureSelector, createSelector } from "@ngrx/store";
// import { BoardState } from "./board.reducer";

// export const selectBoardState = createFeatureSelector<BoardState>('boards');


// export const selectBoards = createSelector(
//   selectBoardState,
//   (state: BoardState) => state.boards
// );

// export const selectIsLoading = createSelector(
//   selectBoardState,
//   (state: BoardState) => state.loading
// );

// export const selectError = createSelector(
//   selectBoardState,
//   (state: BoardState) => state.error
// );

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BoardState, boardAdapter } from "./board.reducer";


const { selectAll, selectEntities } = boardAdapter.getSelectors();

export const selectBoardState = createFeatureSelector<BoardState>('boards');

export const selectBoards = createSelector(
  selectBoardState,
  selectAll
);

export const selectBoardEntities = createSelector(
  selectBoardState,
  selectEntities
);

export const selectIsLoading = createSelector(
  selectBoardState,
  (state: BoardState) => state.loading
);

export const selectError = createSelector(
  selectBoardState,
  (state: BoardState) => state.error
);
