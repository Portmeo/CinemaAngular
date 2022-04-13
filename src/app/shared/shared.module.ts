import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './services/spinner.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
