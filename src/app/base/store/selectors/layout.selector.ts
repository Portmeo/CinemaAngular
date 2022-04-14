import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Layout } from "../models/layout.model";

export const getLayoutData = createFeatureSelector<Layout>('layout');

export const getTitleLayout = createSelector(getLayoutData, (state: Layout) => {
  return state.title;
});
