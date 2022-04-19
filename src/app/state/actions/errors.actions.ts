import { createAction, props } from "@ngrx/store";
import { GenericError } from "@state/models/main-state.model";

export const setErrors = createAction('SET_ERRORS', props<{errors: GenericError}>());
export const resetErrors = createAction('RESET_ERRORS');
