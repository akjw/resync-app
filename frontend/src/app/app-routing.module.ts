import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    canLoad: [AuthGuard],
    loadChildren: () => import('./home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'organizations',
    canLoad: [AuthGuard],
    loadChildren: () => import('./organizations/organizations.module').then(mod => mod.OrganizationsModule)
  },
  {
    path: 'redirectToRoot',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
