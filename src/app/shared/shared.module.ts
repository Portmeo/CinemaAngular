import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './services/spinner.service';
import { TimeMoviePipe } from './pipes/time-movie.pipe';

@NgModule({
  declarations: [
    TimeMoviePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeMoviePipe
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        SpinnerService
      ],
    };
  }
}
