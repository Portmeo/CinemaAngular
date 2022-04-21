import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import db from '@assets/mocks/db.json';
import { environment } from '@env/environment';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        MoviesService
      ]
    });
    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getMovies', async () => {
    service.getMovies().subscribe(response => {
      expect(response).toEqual(db.movies);
    });
    const req = httpTestingController.expectOne(environment.urlApi + 'movies');
    expect(req.request.method).toEqual('GET');
  });
});


