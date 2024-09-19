import { createAction, props } from "@ngrx/store";
import { Board } from "../../model/model";

export const loadBoard = createAction('[Board] Load Boards');
export const loadBoardSuccess = createAction('[Board] Load Boards Success', props<{ boards: Board[] }>());
export const loadBoardFailure = createAction('[Board] Load Boards Failure', props<{ error: string }>());