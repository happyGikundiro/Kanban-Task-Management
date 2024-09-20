import { createAction, props } from '@ngrx/store';
import { Board } from '../../model/model';

export const loadBoards = createAction('[Board] Load Boards');

export const loadBoardsSuccess = createAction(
  '[Board] Load Boards Success', props<{ boards: Board[] }>()
);

export const loadBoardsFailure = createAction(
  '[Board] Load Boards Failure', props<{ error: string }>()
);

export const selectBoard = createAction(
    '[Board] Select Board', props<{ boardName: string }>()
  );