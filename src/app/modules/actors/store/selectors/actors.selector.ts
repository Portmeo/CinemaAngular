import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ActorsState } from "../models/actors.model";

export const getActorsData = createFeatureSelector<ActorsState>('actors');

export const getActorsList = createSelector(getActorsData, (state: ActorsState) =>{
  return state.list;
});

export const getNameActorById = (id: number) => createSelector(getActorsData, (state: ActorsState) =>{
  const actor = state.list.find(actor => actor.id === id);
  return actor ? `${actor.first_name} ${actor.last_name}` : null;
});

