import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MoviesState } from "../models/movie.model";

export const getMoviesData = createFeatureSelector<MoviesState>('movies');

export const getMoviesList = createSelector(getMoviesData, (state: MoviesState) =>{
  return state.list;
})
