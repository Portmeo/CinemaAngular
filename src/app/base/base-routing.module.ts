import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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
    path: 'page-not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
