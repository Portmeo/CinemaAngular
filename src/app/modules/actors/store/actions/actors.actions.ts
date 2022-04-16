import { createAction, props } from "@ngrx/store";
import { Actor } from "../models/actors.model";

export const getActors = createAction('GET_ACTORS');
export const setActors = createAction('SET_ACTORS', props<{list: Actor[]}>());
