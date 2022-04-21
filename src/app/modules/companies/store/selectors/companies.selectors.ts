import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompaniesState } from "../models/company.model";

export const getCompaniesData = createFeatureSelector<CompaniesState>('companies');

export const getCompaniesList = createSelector(getCompaniesData, (state: CompaniesState) => {
  return state.list;
});

export const getCompanyByIdMovie = (id: number) => createSelector(getCompaniesData, (state: CompaniesState) =>{
  const company = state.list.find(company => company.movies.includes(id));
  return company;
});
