import { createAction, props } from "@ngrx/store";
import { Company } from "../models/company.model";

export const getCompanies = createAction('GET_COMPANIES');
export const setCompanies = createAction('SET_COMPANIES', props<{list: Company[]}>());
