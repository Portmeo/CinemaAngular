import { createAction, props } from "@ngrx/store";
import { Movie } from "../models/movie.model";

export const getMovies = createAction('GET_MOVIES');
export const setMovies = createAction('SET_MOVIES', props<{list: Movie[]}>());
