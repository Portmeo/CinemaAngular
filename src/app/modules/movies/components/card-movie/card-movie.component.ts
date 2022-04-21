import { Component, Input } from '@angular/core';
import { Movie } from '@modules/movies/store/models/movie.model';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent {

  @Input() movie!: Movie;

}
