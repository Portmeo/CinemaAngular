import { TestBed } from '@angular/core/testing';
import { SpinnerService } from './spinner.service';

describe('SpinnerService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should changeStateLoaderSpinner', async () => {
    let stateSpinner;
    service.loaderSpinner$.subscribe(state => {
      stateSpinner = state;
    });
    expect(!stateSpinner).toBeTruthy();
    service.changeStateLoaderSpinner(true);
    expect(stateSpinner).toBeTruthy();
  });
});
