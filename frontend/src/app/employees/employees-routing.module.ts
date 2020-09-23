import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpListComponent } from './emp-list/emp-list.component';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { EmpEditComponent } from './emp-edit/emp-edit.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: EmpListComponent, pathMatch: 'full'},
      { path: 'new', component: EmpNewComponent },
      { path: ':id', component: EmpEditComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
