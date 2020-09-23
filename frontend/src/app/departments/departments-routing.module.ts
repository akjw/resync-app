import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeptListComponent } from './dept-list/dept-list.component';
import { DeptNewComponent } from './dept-new/dept-new.component';
import { DeptEditComponent } from './dept-edit/dept-edit.component';

const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: DeptListComponent, pathMatch: 'full'},
      { path: 'new', component: DeptNewComponent },
      { path: ':id', component: DeptEditComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentsRoutingModule { }
