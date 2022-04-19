import { createFeatureSelector } from "@ngrx/store";
import { GenericError } from "@state/models/main-state.model";

export const getErrors = createFeatureSelector<GenericError>('errors');
