import { NgModule } from '@angular/core';
import { StoreConfigurationModule } from '@state/store-configuration.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    StoreConfigurationModule,
    SharedModule
  ]
})
export class CoreModule { }
