import { Component, OnInit } from '@angular/core';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations-list',
  templateUrl: './organizations-list.component.html',
  styleUrls: ['./organizations-list.component.css']
})
export class OrganizationsListComponent implements OnInit {
  data = [];
  headers = [
    {key: 'name', label: 'Name'},
    {key: 'owner', label: 'Owner'},
    {key: 'address', label: 'Address'},
    {key: 'city', label: 'City'},
    {key: 'state', label: 'State'},
    {key: 'country', label: 'Country'},
  ];
  constructor(private orgService: OrgService, private router: Router ) { }

  ngOnInit(): void {
    this.orgService.getOrganizations()
     .subscribe((orgs) => {
       this.data = orgs.organizations;
       console.log(this.data)
     })
  }

  deleteHandler(id){
    var result = confirm("Delete this organization?");
    if (result) {
      this.orgService.deleteOrg(id)
      .subscribe(() => this.orgService.getOrganizations().subscribe((orgs) => {
        this.data = orgs.organizations;
      }))
    }
  }

}
