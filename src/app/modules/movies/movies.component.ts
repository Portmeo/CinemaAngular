import { Component } from '@angular/core';
import { setTitleLayout } from '@base/store/actions/layout.action';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Movie } from './store/models/movie.model';
import { getMoviesList } from './store/selectors/movies.selector';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent {

  public movies$: Observable<Movie[]> = this.store.select(getMoviesList);

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {
    this.store.dispatch(setTitleLayout({title: this.translate.instant('movies.title')}));
  }

}
