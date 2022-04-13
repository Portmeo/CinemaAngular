import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  loaderSpinner$ = new BehaviorSubject<boolean>(false);

  changeStateLoaderSpinner(state: boolean): void {
    this.loaderSpinner$.next(state);
  }
}
