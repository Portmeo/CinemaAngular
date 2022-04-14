import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { setTitleLayout } from 'src/app/base/store/actions/layout.action';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {
    this.store.dispatch(setTitleLayout({title: this.translate.instant('films.title')}))
  }

  ngOnInit(): void {
  }

}
