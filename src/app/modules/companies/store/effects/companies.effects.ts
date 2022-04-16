import { Injectable } from '@angular/core';
import { CompaniesService } from '@modules/companies/services/companies.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpinnerService } from '@shared/services/spinner.service';
import { Company } from '../models/company.model';
import * as CompaniesActions from "../actions/companies.actions";
import { catchError, finalize, map, of, switchMap } from 'rxjs';

@Injectable()
export class CompaniesEffects {
  constructor(
    private readonly actions$: Actions,
    private loaderSpinner: SpinnerService,
    private companiesService: CompaniesService
  ) { }

  getMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CompaniesActions.getCompanies),
      switchMap(() => {
        this.loaderSpinner.changeStateLoaderSpinner(true);
        return this.companiesService.getCompanies().pipe(
          map((companies: Company[]) => {
            return CompaniesActions.setCompanies({ list: companies });
          }),
          catchError(() => of()),
          finalize(() => this.loaderSpinner.changeStateLoaderSpinner(false))
        )
      })
    )
  )
}
