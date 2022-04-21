import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { FormMovieComponent } from '../form-movie/form-movie.component';

import { CreateMovieComponent } from './create-movie.component';
import db from '@assets/mocks/db.json';

describe('CreateMovieComponent', () => {
  let component: CreateMovieComponent;
  let fixture: ComponentFixture<CreateMovieComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMovieComponent, FormMovieComponent ],
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
    fixture = TestBed.createComponent(CreateMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should buildForm', () => {
    component.buildForm();
    expect(component.formMovie).toBeTruthy();
  });

  it('should saveMovie', () => {
    spyOn(component, 'buildForm');
    const storeSpy = spyOn(store, 'dispatch').and.callThrough();
    component.saveMovie();
    expect(component.buildForm).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalled();
  });
});
