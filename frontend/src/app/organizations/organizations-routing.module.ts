import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationsListComponent } from './organizations-list/organizations-list.component';
import { OrgNewComponent } from './org-new/org-new.component';
import { OrgEditComponent } from './org-edit/org-edit.component';



const routes: Routes = [
  { 
    path: '', 
    children: [
      { path: '', component: OrganizationsListComponent, pathMatch: 'full'},
      { path: 'new', component: OrgNewComponent },
      { path: ':id', component: OrgEditComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
