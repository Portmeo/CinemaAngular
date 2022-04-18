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
  on(CompaniesActions.setCompaniesByMovie, (state, { idMovie, oldCompany, newCompany }) => ({
    ...state,
    list: state.list.map(company => {
      const movies = company.id === newCompany ? company.movies.concat([idMovie]) :
      company.movies.includes(oldCompany!) ? company.movies.filter(movie => movie != idMovie) : company.movies;
      return { ...company, movies};
    })
  })),
);
