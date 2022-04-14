import { createReducer, on } from "@ngrx/store";
import { Layout } from "../models/layout.model";
import * as LayoutActions from "../actions/layout.action";

export const initialState: Layout = {
  title: null
};

export const LayoutReducer = createReducer(
  initialState,
  on(LayoutActions.setTitleLayout, (state, { title }) => ({
    ...state,
    title
  }))
);


