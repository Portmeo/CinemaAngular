import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { getActors } from '@modules/actors/store/actions/actors.actions';
import { getCompanies } from '@modules/companies/store/actions/companies.actions';
import { getMovies } from '@modules/movies/store/actions/movies.actions';
import { Store } from '@ngrx/store';
import { UnsubscribeOnDestroy } from '@shared/class/unsubscribeOnDestroy';
import { SpinnerService } from '@shared/services/spinner.service';
import { resetErrors } from '@state/actions/errors.actions';
import { GenericError } from '@state/models/main-state.model';
import { getErrors } from '@state/selectors/main.selectors';
import { takeUntil } from 'rxjs';
import { getTitleLayout } from '../../store/selectors/layout.selector';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent extends UnsubscribeOnDestroy {

  public title = this.store.select(getTitleLayout);
  public isShowMenuButton!: boolean;

  constructor(
    readonly spinnerService: SpinnerService,
    private store: Store,
    private router: Router,
    readonly dialog: MatDialog
  ) {
    super();
    this.showMenuButton();
    this.getData();
    this.getErrors();
  }

  getData(): void {
    this.store.dispatch(getMovies());
    this.store.dispatch(getActors());
    this.store.dispatch(getCompanies());
  }

  showMenuButton(): void {
    this.router.events.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((routeEvent) => {
      if (routeEvent instanceof NavigationEnd) {
        this.isShowMenuButton = routeEvent.url.split('/').length < 3;
      }
    });
  }

  getErrors(): void {
    this.store.select(getErrors)
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe((errors: GenericError) => {
        if (errors.message) {
          const errorDialog = this.dialog.open(ErrorComponent, {
            data: {
              errors
            }
          });
          errorDialog.afterClosed().subscribe(result => {
            this.store.dispatch(resetErrors());
          });
        }
      })
  }
}

