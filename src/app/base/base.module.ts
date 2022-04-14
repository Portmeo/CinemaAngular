import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { ErrorComponent } from './components/error/error.component';
import { BaseRoutingModule } from './base-routing.module';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LayoutReducer } from './store/reducers/layout.reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    LayoutComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    BaseRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatProgressSpinnerModule,
    TranslateModule.forChild(),
    StoreModule.forFeature('layout', LayoutReducer)
  ]
})
export class BaseModule { }
