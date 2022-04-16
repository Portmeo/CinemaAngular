import { createAction, props } from "@ngrx/store";
import { Movie } from "../models/movie.model";

export const getMovies = createAction('GET_MOVIES');
export const setMovies = createAction('SET_MOVIES', props<{list: Movie[]}>());
export const createMovie = createAction('CREATE_MOVIE', props<{movie: Movie}>());
export const removeMovie = createAction('REMOVE_MOVIE', props<{id: number}>());
