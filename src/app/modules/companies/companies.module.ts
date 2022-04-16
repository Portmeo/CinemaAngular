import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CompaniesService } from './services/companies.service';
import { CompaniesEffects } from './store/effects/companies.effects';
import { companiesReducer } from './store/reducers/companies.reducers';

@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature('companies', companiesReducer),
    EffectsModule.forFeature([CompaniesEffects]),
  ],
  providers: [
    CompaniesService
  ]
})
export class CompaniesModule { }
