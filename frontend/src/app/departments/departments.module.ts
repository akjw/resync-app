import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsRoutingModule } from './departments-routing.module';
import { DeptListComponent } from './dept-list/dept-list.component';
import { DeptNewComponent } from './dept-new/dept-new.component';
import { DeptEditComponent } from './dept-edit/dept-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DeptListComponent, DeptNewComponent, DeptEditComponent],
  imports: [
    CommonModule,
    DepartmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DepartmentsModule { }
