import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ActorsService } from './services/actors.service';
import { ActorsEffects } from './store/effects/actors.effects';
import { actorsReducer } from './store/reducers/actors.reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('actors', actorsReducer),
    EffectsModule.forFeature([ActorsEffects]),
  ],
  providers: [
    ActorsService
  ]
})
export class ActorsModule { }
