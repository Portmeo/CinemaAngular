import { Injectable } from "@angular/core";
import { ActorsService } from "@modules/actors/services/actors.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { SpinnerService } from "@shared/services/spinner.service";
import { catchError, finalize, map, of, switchMap } from "rxjs";
import * as ActorsActions from "../actions/actors.actions";
import * as MainActions from "@state/actions/errors.actions";
import { Actor } from "../models/actors.model";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ActorsEffects {
  constructor(
    private readonly actions$: Actions,
    private loaderSpinner: SpinnerService,
    private actorsService: ActorsService,
    private translate: TranslateService
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
          catchError((error) => of(MainActions.setErrors(
            {
              errors: {
                code: error.status,
                message: this.translate.instant('actors.error')
              }
            }
          ))),
          finalize(() => this.loaderSpinner.changeStateLoaderSpinner(false))
        )
      })
    )
  )
}
