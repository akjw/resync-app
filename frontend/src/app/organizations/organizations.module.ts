import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrganizationsRoutingModule } from './organizations-routing.module';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrgNewComponent } from './org-new/org-new.component';
import { OrgEditComponent } from './org-edit/org-edit.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [OrganizationsListComponent, OrgNewComponent, OrgEditComponent],
  imports: [
    CommonModule,
    OrganizationsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class OrganizationsModule { }
