import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { setTitleLayout } from '@base/store/actions/layout.action';
import { Actor } from '@modules/actors/store/models/actors.model';
import { getActorsList } from '@modules/actors/store/selectors/actors.selector';
import { Company } from '@modules/companies/store/models/company.model';
import { getCompaniesList } from '@modules/companies/store/selectors/companies.selectors';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as MovieActions from "../../store/actions/movies.actions";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent {

  public formMovie!: FormGroup;
  public URL_REGEXP = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  public companies$: Observable<Company[]> = this.store.select(getCompaniesList);
  public actors$: Observable<Actor[]> = this.store.select(getActorsList);

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {
    this.store.dispatch(setTitleLayout({ title: this.translate.instant('movies.new') }));
    this.buildForm();
  }

  buildForm() {
    this.formMovie = new FormGroup({
      id: new FormControl(Math.floor(Math.random() * 10000)),
      title: new FormControl('', Validators.required),
      poster: new FormControl('', [Validators.required, Validators.pattern(this.URL_REGEXP)]),
      genre: new FormArray([], Validators.required),
      actors: new FormArray([], Validators.required),
      company: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required),
      imdbRating: new FormControl('', Validators.required)
    });
  }

  saveMovie(): void {
    const {company, ...movie } = this.formMovie.value;
    this.store.dispatch(MovieActions.createMovie({ movie: movie }));
    this.buildForm();
  }

}
