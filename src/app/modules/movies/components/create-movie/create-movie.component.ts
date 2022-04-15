import { Component, OnInit } from '@angular/core';
import { setTitleLayout } from '@base/store/actions/layout.action';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {
    this.store.dispatch(setTitleLayout({title: this.translate.instant('films.new')}));
  }

  ngOnInit(): void {
  }

}
