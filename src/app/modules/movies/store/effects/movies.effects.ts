import { Injectable } from "@angular/core";
import { MoviesService } from "@modules/movies/services/movies.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { SpinnerService } from "@shared/services/spinner.service";
import { catchError, finalize, map, of, switchMap } from "rxjs";
import * as MoviesActions from "../actions/movies.actions";
import { Movie } from "../models/movie.model";

@Injectable()
export class MoviesEffects {
  constructor(
    private readonly actions$: Actions,
    private loaderSpinner: SpinnerService,
    private moviesService: MoviesService
  ) { }

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MoviesActions.getMovies),
      switchMap(() => {
        this.loaderSpinner.changeStateLoaderSpinner(true);
        return this.moviesService.getMovies().pipe(
          map((movies: Movie[]) => {
            return MoviesActions.setMovies({ list: movies });
          }),
          catchError(() => of()),
          finalize(() => this.loaderSpinner.changeStateLoaderSpinner(false))
        )
      })
    )
  )
}
