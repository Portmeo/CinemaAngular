import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMovieComponent } from './form-movie.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { take } from 'rxjs';
import db from '@assets/mocks/db.json';

describe('FormMovieComponent', () => {
  let component: FormMovieComponent;
  let fixture: ComponentFixture<FormMovieComponent>;
  let store: MockStore;
  const initialState = {
    errors: {
      message: 'testing',
      code: 0
    },
    actors: {
      list: db.actors
    },
    companies: {
      list: db.companies
    },
    movies: {
      list: db.movies
    },
    layaout: {
      title: 'test'
    }
  };

  const formMovieMock = new FormGroup({
    id: new FormControl(Math.floor(Math.random() * 10000)),
    title: new FormControl(''),
    poster: new FormControl(''),
    genre: new FormArray([]),
    actors: new FormArray([]),
    company: new FormControl(''),
    year: new FormControl(''),
    duration: new FormControl(''),
    imdbRating: new FormControl('')
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormMovieComponent],
      imports: [
        TranslateModule.forRoot(),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMovieComponent);
    component = fixture.componentInstance;
    component.formMovie = formMovieMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should addGenre', () => {
    component.addGenre('addGenreMock');
    expect(component.genreValues.value.length).toBe(1);
  });

  it('should removeGenre', () => {
    component.addGenre('addGenreMock');
    component.removeGenre(0);
    expect(component.genreValues.value.length).toBe(0);
  });

  it('should addActor', () => {
    component.addActor(1);
    expect(component.actorsValues.value.length).toBe(1);
    component.removeActor(0);
  });

  it('should removeActor', () => {
    component.addActor(1);
    component.removeActor(0);
    expect(component.actorsValues.value.length).toBe(0);
  });

  it('should isSelectedActor', () => {
    expect(!component.isSelectedActor(1)).toBeTruthy();
  });

  it('should getNameActor', () => {
    component.getNameActor(1).subscribe(actor => {
      expect(actor).toBe('Isaak McQuode');
    });
    component.getNameActor(0).subscribe(actor => {
      expect(actor).toBe(null);
    });
  });
});
