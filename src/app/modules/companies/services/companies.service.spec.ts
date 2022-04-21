import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CompaniesService } from './companies.service';
import db from '@assets/mocks/db.json';
import { environment } from '@env/environment';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CompaniesService
      ]
    });
    service = TestBed.inject(CompaniesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getCompanies', async () => {
    service.getCompanies().subscribe(response => {
      expect(response).toEqual(db.companies);
    });
    const req = httpTestingController.expectOne(environment.urlApi + 'companies');
    expect(req.request.method).toEqual('GET');
  });
});
