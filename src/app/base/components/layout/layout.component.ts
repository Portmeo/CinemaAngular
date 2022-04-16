import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { getActors } from '@modules/actors/store/actions/actors.actions';
import { getCompanies } from '@modules/companies/store/actions/companies.actions';
import { getMovies } from '@modules/movies/store/actions/movies.actions';
import { Store } from '@ngrx/store';
import { SpinnerService } from '@shared/services/spinner.service';
import { getTitleLayout } from '../../store/selectors/layout.selector';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public title = this.store.select(getTitleLayout);
  public isShowMenuButton!: boolean;

  constructor(
    readonly spinnerService: SpinnerService,
    private store: Store,
    private router: Router
  ) {
    this.router.events.subscribe((routeEvent) => {
      if (routeEvent instanceof NavigationEnd) {
        this.isShowMenuButton = routeEvent.url.split('/').length < 3;
      }
    });
    this.store.dispatch(getMovies());
    this.store.dispatch(getActors());
    this.store.dispatch(getCompanies());
  }

  ngOnInit(): void { }

}
