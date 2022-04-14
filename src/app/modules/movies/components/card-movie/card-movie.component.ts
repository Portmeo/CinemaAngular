import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '@modules/movies/store/models/movie.model';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent implements OnInit {

  @Input() movie!: Movie;

  constructor() { }

  ngOnInit(): void {
  }

}
