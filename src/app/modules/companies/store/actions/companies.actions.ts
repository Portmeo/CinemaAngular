import { createAction, props } from "@ngrx/store";
import { Company } from "../models/company.model";

export const getCompanies = createAction('GET_COMPANIES');
export const setCompanies = createAction('SET_COMPANIES', props<{list: Company[]}>());
export const setCompaniesByMovie = createAction('SET_COMPANIES_BY_MOVIE', props<{idMovie: number, oldCompany?: number, newCompany: number}>());
