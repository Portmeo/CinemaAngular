import { createReducer, on } from "@ngrx/store";
import { ActorsState } from "../models/actors.model";
import * as ActorsActions from "../actions/actors.actions";

export const initialState: ActorsState = {
  list: [],
}

export const actorsReducer = createReducer(
  initialState,
  on(ActorsActions.setActors, (state, { list }) => ({
    ...state,
    list
  })),

)
