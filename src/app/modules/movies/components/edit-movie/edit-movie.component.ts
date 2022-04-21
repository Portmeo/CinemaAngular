import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { setTitleLayout } from '@base/store/actions/layout.action';
import { setActorsByMovie } from '@modules/actors/store/actions/actors.actions';
import { Actor } from '@modules/actors/store/models/actors.model';
import { getActorsList, getNameActorById } from '@modules/actors/store/selectors/actors.selector';
import { setCompaniesByMovie } from '@modules/companies/store/actions/companies.actions';
import { Company } from '@modules/companies/store/models/company.model';
import { getCompaniesList, getCompanyByIdMovie } from '@modules/companies/store/selectors/companies.selectors';
import * as MoviesActions from '@modules/movies/store/actions/movies.actions';
import { Movie } from '@modules/movies/store/models/movie.model';
import { getMovieById } from '@modules/movies/store/selectors/movies.selector';
import { Store } from '@ngrx/store';
import { UnsubscribeOnDestroy } from '@shared/class/unsubscribeOnDestroy';
import { firstValueFrom, Observable, takeUntil } from 'rxjs';

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
  public movie!: Movie;
  public company!: Company | undefined;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private store: Store,
  ) {
    super();
    this.store.select(getMovieById(+this.actRoute.snapshot.params['id']))
      .pipe(
        takeUntil(this.destroyed$)
      ).subscribe(async movie => {
        if (movie) {
          this.store.dispatch(setTitleLayout({ title: `${movie.title} (${movie.year})` }));
          this.isEnableUpdate = false;
          this.movie = movie;
          this.company = await firstValueFrom(this.getCompany(movie.id));
          this.buildForm(movie);
        } else {
          this.router.navigate(['/movies']);
        }
      })
  }

  buildForm(movie: Movie) {
    this.formMovie = new FormGroup({
      id: new FormControl(movie.id),
      title: new FormControl(movie.title, Validators.required),
      poster: new FormControl(movie.poster, [Validators.required, Validators.pattern(this.URL_REGEXP)]),
      genre: new FormArray([], Validators.required),
      actors: new FormArray([], Validators.required),
      company: new FormControl(this.company!.id, Validators.required),
      year: new FormControl(movie.year, Validators.required),
      duration: new FormControl(movie.duration, Validators.required),
      imdbRating: new FormControl(movie.imdbRating, Validators.required)
    });
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

  enableMovie(): void {
    this.isEnableUpdate = true;
  }

  updateMovie(): void {
    const { company, ...movie } = this.formMovie.value;
    this.store.dispatch(setActorsByMovie({ idMovie: movie.id, oldActors: this.movie.actors, newActors: movie.actors }));
    this.store.dispatch(setCompaniesByMovie({ idMovie: movie.id, oldCompany: this.company!.id, newCompany: company }));
    this.store.dispatch(MoviesActions.updateMovie({ movieUpdate: movie }));
  }

  removeMovie(): void {
    this.store.dispatch(MoviesActions.removeMovie({ id: this.formMovie.get('id')!.value }));
  }

  getNameActor(id: number): Observable<string | null> {
    return this.store.select(getNameActorById(id));
  }

  getCompany(id: number): Observable<Company | undefined> {
    return this.store.select(getCompanyByIdMovie(id));
  }
}
