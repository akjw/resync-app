import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrgService } from '../org.service';
import { Router, ActivatedRoute } from '@angular/router';

interface Org {
  _id: string;
  name: string;
  owner: string;
  address: string;
  city: string;
  state: string;
  country: string;
}

@Component({
  selector: 'app-org-edit',
  templateUrl: './org-edit.component.html',
  styleUrls: ['./org-edit.component.css']
})
export class OrgEditComponent implements OnInit {
  name = '';
  owner = '';
  address = '';
  city = '';
  state = '';
  country = '';
  id: string;
  org: Org;

  authForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    owner: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)  
    ])
  });

  constructor(
    private orgService: OrgService,
    private router: Router,
    private actRoute: ActivatedRoute
    ) {
      this.id = this.actRoute.snapshot.params.id;
     }

  ngOnInit() {
    this.orgService.getOrg(this.id)
    .subscribe((org) => {
      this.populateForm(org.organization)
      // this.org = org.organization;
      console.log(this.org)
    })
  }

  populateForm(org){
    this.authForm.patchValue({
      name: org.name,
      owner: org.owner,
      address: org.address,
      city: org.city,
      state: org.state,
      country: org.country
    })
  }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.orgService.editOrg(this.id, this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/organizations')
      },
      error: (err) => {
        this.authForm.setErrors({
          unknownError: true
        });
        
      }
    });
  }
}
