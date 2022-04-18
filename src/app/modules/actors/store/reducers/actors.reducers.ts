import { createReducer, on } from "@ngrx/store";
import { ActorsState } from "../models/actors.model";
import * as ActorsActions from "../actions/actors.actions";

export const initialState: ActorsState = {
  list: [],
}

export const actorsReducer = createReducer(
  initialState,
  on(ActorsActions.setActors, (state, { list }) => ({
    ...state,
    list
  })),
  on(ActorsActions.setActorsByMovie, (state, { idMovie, oldActors, newActors }) => ({
    ...state,
    list: state.list.map(actor => {
      const movies = newActors.includes(actor.id) ? actor.movies.concat([idMovie]) :
      oldActors?.includes(actor.id) ? actor.movies.filter(movie => movie !== idMovie) : actor.movies;
      return { ...actor, movies};
    })
  })),
)
