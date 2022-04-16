import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { setTitleLayout } from '@base/store/actions/layout.action';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as MovieActions from "../../store/actions/movies.actions";

@Component({
  selector: 'app-create-movie',
  templateUrl: './create-movie.component.html',
  styleUrls: ['./create-movie.component.scss']
})
export class CreateMovieComponent implements OnInit {

  public formMovie!: FormGroup;
  public URL_REGEXP = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

  public companies: any = [{ id: 1, name: 'company1' }, { id: 2, name: 'company2' }, { id: 3, name: 'company3' }];
  public actors: any = [{ id: 1, name: 'actor1' }, { id: 2, name: 'actor2' }, { id: 3, name: 'actor3' }];


  @ViewChild('inputGenren', { read: MatInput }) inputGenren!: MatInput;
  @ViewChild('selectActor', { read: MatSelect }) selectActor!: MatSelect;

  constructor(
    private store: Store,
    private translate: TranslateService,
  ) {
    this.store.dispatch(setTitleLayout({ title: this.translate.instant('movies.new') }));
    this.buildForm();
  }

  ngOnInit(): void {
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

  get genreValues(): FormArray {
    return this.formMovie.get('genre') as FormArray;
  }

  get actorsValues(): FormArray {
    return this.formMovie.get('actors') as FormArray;
  }

  saveMovie(): void {
    this.store.dispatch(MovieActions.createMovie({ movie: this.formMovie.value }));
    this.buildForm();
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

  getNameActor(id: number): void {
    return this.actors.find((actor: any) => actor.id === id).name
  }

}
