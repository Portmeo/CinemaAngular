import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { Actor } from '@modules/actors/store/models/actors.model';
import { getNameActorById } from '@modules/actors/store/selectors/actors.selector';
import { Company } from '@modules/companies/store/models/company.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form-movie',
  templateUrl: './form-movie.component.html',
  styleUrls: ['./form-movie.component.scss']
})
export class FormMovieComponent implements OnInit {

  @Input() companies!: Company[] | null;
  @Input() actors!: Actor[] | null;

  @Input() formMovie!: FormGroup;
  @ViewChild('inputGenren', { read: MatInput }) inputGenren!: MatInput;
  @ViewChild('selectActor', { read: MatSelect }) selectActor!: MatSelect;

  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
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

  getNameActor(id: number): Observable<string | null> {
    return this.store.select(getNameActorById(id));
  }

}
