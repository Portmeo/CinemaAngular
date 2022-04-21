import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ActorsService } from './actors.service';
import db from '@assets/mocks/db.json';
import { environment } from '@env/environment';

describe('ActorsService', () => {
  let service: ActorsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ActorsService
      ]
    });
    service = TestBed.inject(ActorsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getActors', async () => {
    service.getActors().subscribe(response => {
      expect(response).toEqual(db.actors);
    });
    const req = httpTestingController.expectOne(environment.urlApi + 'actors');
    expect(req.request.method).toEqual('GET');
  });
});
