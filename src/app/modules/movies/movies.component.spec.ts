import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { MoviesComponent } from './movies.component';
import db from '@assets/mocks/db.json';
import { TranslateModule } from '@ngx-translate/core';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesComponent, CardMovieComponent ],
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        MatIconModule,
        MatButtonModule
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
