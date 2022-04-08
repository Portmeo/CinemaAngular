import { NgModule } from '@angular/core';
import { environment } from '@env/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { mainReducer } from './reducers/main.reducer';



@NgModule({
  imports: [
    StoreModule.forRoot({...mainReducer}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ]
})
export class StoreConfigurationModule { }
