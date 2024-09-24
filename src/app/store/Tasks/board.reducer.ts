import { createReducer, on } from '@ngrx/store';
import * as BoardActions from './board.actions';
import { Board, Column } from '../../model/model';

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
  
  on(BoardActions.addBoardFailure, (state, { error }) => ({ ...state, loading: false, error, })),

  on(BoardActions.updateBoard, (state) => ({ ...state, loading: true })),

  on(BoardActions.updateBoardSuccess, (state, { board }) => ({
    ...state, loading: false, boards: state.boards.map(b => b.name === board.name ? board : b), activeBoard: board
  })),

  on(BoardActions.updateBoardFailure, (state, { error }) => ({
    ...state, loading: false, error: error
  })),

  on(BoardActions.addTask, (state) => ({ ...state, loading: true })),

  on(BoardActions.addTaskSuccess, (state, { boardName, task }) => {
    const updatedBoards = state.boards.map(board => 
      board.name === boardName ? 
          {
            ...board,
            columns: board.columns.map((column: Column) => 
              column.name === task.status
                ? { ...column, tasks: [...(column.tasks || []), task] }
                : column
            )
          }
        : board
    );
    return { ...state, boards: updatedBoards, loading: false, error: null };
  }),

  on(BoardActions.addTaskFailure, (state, { error }) => ({
    ...state, loading: false, error: error
  })),

  on(BoardActions.deleteBoardSuccess, (state, { boardName }) => ({
    ...state,
    boards: state.boards.filter((board) => board.name !== boardName),
    activeBoardName: state.activeBoardName === boardName ? null : state.activeBoardName,
    error: null,
  })),

  on(BoardActions.deleteBoardSuccess, (state, { boardName }) => {
    const remainingBoards = state.boards.filter((board) => board.name !== boardName);
    const nextBoardName = remainingBoards.length > 0 ? remainingBoards[0].name : null;
  
    return {
      ...state,
      boards: remainingBoards,
      activeBoardName: nextBoardName, 
      error: null,
    };
  }),
  
  on(BoardActions.deleteBoardFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(BoardActions.deleteTaskSuccess, (state, { boardName, task }) => ({
    ...state,
    boards: state.boards.map((board) =>
      board.name === boardName
        ? {
            ...board,
            columns: board.columns.map((column) => ({
              ...column,
              tasks: column.tasks?.filter((t) => t.title !== task.title),
            })),
          }
        : board
    ),
    error: null,
  })),

  on(BoardActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error,
  }))
)