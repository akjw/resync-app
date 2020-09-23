import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmpEditComponent } from './emp-edit/emp-edit.component';
import { EmpNewComponent } from './emp-new/emp-new.component';
import { EmpListComponent } from './emp-list/emp-list.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [EmpEditComponent, EmpNewComponent, EmpListComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class EmployeesModule { }
