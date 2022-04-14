import { createAction, props } from "@ngrx/store";

export const setTitleLayout = createAction('SET_TITLE_LAYOUT', props<{title: string}>())
