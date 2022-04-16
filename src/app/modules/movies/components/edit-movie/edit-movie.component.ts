import { Component, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { setTitleLayout } from '@base/store/actions/layout.action';
import { Actor } from '@modules/actors/store/models/actors.model';
import { getActorsList, getNameActorById } from '@modules/actors/store/selectors/actors.selector';
import { Company } from '@modules/companies/store/models/company.model';
import { getCompaniesList } from '@modules/companies/store/selectors/companies.selectors';
import * as MoviesActions from '@modules/movies/store/actions/movies.actions';
import { Movie } from '@modules/movies/store/models/movie.model';
import { getMovieById } from '@modules/movies/store/selectors/movies.selector';
import { Store } from '@ngrx/store';
import { UnsubscribeOnDestroy } from '@shared/class/unsubscribeOnDestroy';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss']
})
export class EditMovieComponent extends UnsubscribeOnDestroy {

  public formMovie!: FormGroup;
  public URL_REGEXP = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  public companies$: Observable<Company[]> = this.store.select(getCompaniesList);
  public actors$: Observable<Actor[]> = this.store.select(getActorsList);
  public isEnableUpdate = false;

  @ViewChild('inputGenren', { read: MatInput }) inputGenren!: MatInput;
  @ViewChild('selectActor', { read: MatSelect }) selectActor!: MatSelect;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
    super();
    if (this.actRoute.snapshot.params['id']) {
      this.store.select(getMovieById(+this.actRoute.snapshot.params['id']))
        .pipe(
          takeUntil(this.destroyed$)
        ).subscribe(movie => {
          if (movie) {
            this.store.dispatch(setTitleLayout({ title: movie.title }));
            this.isEnableUpdate = false;
            this.buildForm(movie);
          } else {
            this.router.navigate(['/movies']);
          }
        })
    }
  }

  buildForm(movie: Movie) {
    this.formMovie = new FormGroup({
      id: new FormControl(movie.id),
      title: new FormControl(movie.title, Validators.required),
      poster: new FormControl(movie.poster, [Validators.required, Validators.pattern(this.URL_REGEXP)]),
      genre: new FormArray([], Validators.required),
      actors: new FormArray([], Validators.required),
      company: new FormControl('', Validators.required),
      year: new FormControl(movie.year, Validators.required),
      duration: new FormControl(movie.duration, Validators.required),
      imdbRating: new FormControl(movie.imdbRating, Validators.required)
    });
    this.formMovie.disable();
    this.addActors(movie.actors);
    this.addGenres(movie.genre);
  }

  addActors(actors: number[]) {
    actors.forEach(actor => this.actorsValues.push(new FormControl(actor)));
  }

  addGenres(genres: string[]) {
    genres.forEach(genre => this.genreValues.push(new FormControl(genre)));
  }

  get genreValues(): FormArray {
    return this.formMovie.get('genre') as FormArray;
  }

  get actorsValues(): FormArray {
    return this.formMovie.get('actors') as FormArray;
  }

  addGenre(value: string): void {
    if (!this.genreValues.value.includes(value)) {
      this.genreValues.push(new FormControl(value));
      this.inputGenren.value = '';
    }
  }

  removeGenre(index: number): void {
    this.genreValues.removeAt(index);
  }

  addActor(value: number): void {
    this.actorsValues.push(new FormControl(value));
    this.selectActor.value = '';
  }

  removeActor(index: number): void {
    this.actorsValues.removeAt(index);
  }

  isSelectedActor(id: number): boolean {
    return this.actorsValues.value.includes(id);
  }

  getNameActor(id: number): Observable<string | undefined> {
    return this.store.select(getNameActorById(id));
  }

  enableMovie() {
    this.isEnableUpdate = true;
    this.formMovie.enable();
  }

  updateMovie() {
    this.isEnableUpdate = false;
    this.formMovie.disable();
  }

  removeMovie() {
    this.store.dispatch(MoviesActions.removeMovie({ id: this.formMovie.get('id')!.value }));
  }
}
