import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full',
      },
      {
        path: 'movies',
        component: LayoutComponent,
        loadChildren: () => import('../modules/movies/movies.module').then(m => m.MoviesModule)
      },
      {
        path: 'actors',
        component: LayoutComponent,
        loadChildren: () => import('../modules/actors/actors.module').then(m => m.ActorsModule)
      },
      {
        path: 'companies',
        component: LayoutComponent,
        loadChildren: () => import('../modules/companies/companies.module').then(m => m.CompaniesModule)
      }
    ]
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
