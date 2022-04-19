import { createReducer, on } from '@ngrx/store';
import { GenericError } from '@state/models/main-state.model';
import * as MainActions from "../actions/errors.actions"

export const initialState: GenericError = {
  code: null,
  message: null
};

export const errorReducer = createReducer(
  initialState,
  on(MainActions.setErrors, (state, { errors }) => errors),
  on(MainActions.resetErrors, (state) => initialState)
);
