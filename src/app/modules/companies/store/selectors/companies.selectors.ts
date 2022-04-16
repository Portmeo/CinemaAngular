import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CompaniesState } from "../models/company.model";

export const getCompaniesData = createFeatureSelector<CompaniesState>('companies');

export const getCompaniesList = createSelector(getCompaniesData, (state: CompaniesState) => {
  return state.list;
});
