import { createReducer } from '@ngrx/store';
import { MainState } from '@state/models/main-state.model';

export const initialState: MainState = {
  errors: null
};

export const mainReducer = createReducer(initialState);
