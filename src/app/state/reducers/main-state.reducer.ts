import { ActionReducerMap } from "@ngrx/store";
import { MainState } from "@state/models/main-state.model";
import { errorReducer } from "./errors.reducer";

export const reducers: ActionReducerMap<MainState> = {
  errors: errorReducer
}
