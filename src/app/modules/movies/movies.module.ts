import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { EditMovieComponent } from './components/edit-movie/edit-movie.component';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { StoreModule } from '@ngrx/store';
import { moviesReducer } from './store/reducers/movies.reducer';
import { MoviesEffects } from './store/effects/movies.effects';
import { EffectsModule } from '@ngrx/effects';
import { MoviesService } from './services/movies.service';

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
  ],
  providers: [
    MoviesService
  ]
})
export class MoviesModule { }
