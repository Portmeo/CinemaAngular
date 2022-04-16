import { Injectable } from "@angular/core";
import { ActorsService } from "@modules/actors/services/actors.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { SpinnerService } from "@shared/services/spinner.service";
import { catchError, finalize, map, of, switchMap } from "rxjs";
import * as ActorsActions from "../actions/actors.actions";
import { Actor } from "../models/actors.model";

@Injectable()
export class ActorsEffects {
  constructor(
    private readonly actions$: Actions,
    private loaderSpinner: SpinnerService,
    private actorsService: ActorsService
  ) { }

  getActors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActorsActions.getActors),
      switchMap(() => {
        this.loaderSpinner.changeStateLoaderSpinner(true);
        return this.actorsService.getActors().pipe(
          map((actors: Actor[]) => {
            return ActorsActions.setActors({ list: actors });
          }),
          catchError(() => of()),
          finalize(() => this.loaderSpinner.changeStateLoaderSpinner(false))
        )
      })
    )
  )
}
