import { createAction, props } from '@ngrx/store';
import { Board, Task } from '../../model/model';

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

export const addBoard = createAction(
    '[Board] Add Board', props<{ board: Board }>()
);
  
export const addBoardSuccess = createAction(
    '[Board] Add Board Success', props<{ board: Board }>()
);
  
export const addBoardFailure = createAction(
    '[Board] Add Board Failure', props<{ error: string }>()
);

export const updateBoard = createAction(
  '[Board] Update Board', props<{ board: Board }>()
);

export const updateBoardSuccess = createAction(
  '[Board] Update Board Success', props<{ board: Board }>()
);

export const updateBoardFailure = createAction(
  '[Board] Update Board Failure', props<{ error: string }>()
);

export const addTask = createAction(
  '[Task] Add Task', props<{ boardName: string; task: Task }>()
);

export const addTaskSuccess = createAction(
  '[Task] Add Task Success', props<{ boardName: string; task: Task }>()
);

export const addTaskFailure = createAction(
  '[Task] Add Task Failure', props<{ error: string }>()
);

export const deleteBoardSuccess = createAction(
  '[Board] Delete Board Success', props<{ boardName: string }>()
);

export const deleteBoardFailure = createAction(
  '[Board] Delete Board Failure', props<{ error: string }>()
);

export const deleteTaskSuccess = createAction(
  '[Task] Delete Task Success', props<{ boardName: string; task: Task }>()
);

export const deleteTaskFailure = createAction(
  '[Task] Delete Task Failure', props<{ error: string }>()
);
