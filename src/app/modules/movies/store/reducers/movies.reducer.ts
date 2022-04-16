import { createReducer, on } from "@ngrx/store";
import { MoviesState } from "../models/movie.model";
import * as MovieActions from "../actions/movies.actions";

export const initialState: MoviesState = {
  list: [],
}

export const moviesReducer = createReducer(
  initialState,
  on(MovieActions.setMovies, (state, { list }) => ({
    ...state,
    list
  })),
  on(MovieActions.createMovie, (state, { movie }) => ({
    ...state,
    list: [...state.list, movie]
  })),
  on(MovieActions.removeMovie, (state, { id }) => ({
    ...state,
    list: state.list.filter(movie => movie.id !== id)
  }))
)

