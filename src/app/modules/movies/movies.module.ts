import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { StoreModule } from '@ngrx/store';
import { moviesReducer } from './store/reducers/movies.reducer';
import { MoviesEffects } from './store/effects/movies.effects';
import { EffectsModule } from '@ngrx/effects';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { MoviesService } from './services/movies.service';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    MoviesComponent,
    CardMovieComponent,
    EditMovieComponent,
    CreateMovieComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    TranslateModule.forChild(),
    StoreModule.forFeature('movies', moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
