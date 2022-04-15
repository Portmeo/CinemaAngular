import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateMovieComponent } from './components/create-movie/create-movie.component';
import { MoviesComponent } from './movies.component';

const routes: Routes = [
  {
    path: '', component: MoviesComponent,
  },
  {
    path: 'create', component: CreateMovieComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
