import { createReducer, on } from "@ngrx/store";
import { CompaniesState } from "../models/company.model";
import * as CompaniesActions from "../actions/companies.actions";

const initialState: CompaniesState = {
  list: []
};

export const companiesReducer = createReducer(
  initialState,
  on(CompaniesActions.setCompanies, (state, { list }) => ({
    ...state,
    list
  })),
);
