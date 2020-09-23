import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { CalendarComponent } from './calendar/calendar.component';

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
    path: 'departments',
    canLoad: [AuthGuard],
    loadChildren: () => import('./departments/departments.module').then(mod => mod.DepartmentsModule)
  },
  {
    path: 'employees',
    canLoad: [AuthGuard],
    loadChildren: () => import('./employees/employees.module').then(mod => mod.EmployeesModule)
  },
  {
    path: 'redirectToRoot',
    redirectTo: '/'
  },
  { path: 'calendar',  canLoad: [AuthGuard], component: CalendarComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
