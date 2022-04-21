import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { EditMovieComponent } from './edit-movie.component';
import db from '@assets/mocks/db.json';
import { FormMovieComponent } from '../form-movie/form-movie.component';

describe('EditMovieComponent', () => {
  let component: EditMovieComponent;
  let fixture: ComponentFixture<EditMovieComponent>;
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
    layout: {
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

  let movieMock = {
    id: 1,
    title: "Dancing Lady",
    poster: "http://dummyimage.com/400x600.png/cc0000/ffffff",
    genre: ["Comedy", "Musical", "Romance"],
    year: 2006,
    duration: 161,
    imdbRating: 8.27,
    actors: [4, 5, 6]
  };

  const companyMock = {
    id: 5,
    name: "Kub, Kertzmann and Sanford",
    country: "China",
    createYear: 1999,
    employees: 921,
    rating: 1.77,
    movies: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditMovieComponent, FormMovieComponent],
      imports: [
        TranslateModule.forRoot(),
        SharedModule.forRoot(),
        RouterTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } }
          }
        }
      ]
    })
      .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMovieComponent);
    component = fixture.componentInstance;
    component.formMovie = formMovieMock;
    component.movie = movieMock;
    component.company = companyMock;
    fixture.detectChanges();
  });

  it('should create without params', inject([ActivatedRoute], (actRoute: ActivatedRoute) => {
    actRoute.snapshot.params = { id: null };
    fixture = TestBed.createComponent(EditMovieComponent);
    component = fixture.componentInstance;
    component.formMovie = formMovieMock;
    component.movie = movieMock;
    fixture.detectChanges();
    component.movie = movieMock;
    expect(component).toBeTruthy();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should buildForm', () => {
    component.buildForm(movieMock);
    expect(component.formMovie).toBeTruthy();
  });

  it('should enableMovie', () => {
    component.enableMovie();
    expect(component.isEnableUpdate).toBeTruthy();
  });

  it('should updateMovie', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.updateMovie();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should removeMovie', () => {
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.removeMovie();
    expect(storeSpy).toHaveBeenCalled();
  });

  it('should getCompany', () => {
    component.getCompany(0).subscribe(company => {
      expect(company).toBe(undefined);
    });
  });

});
