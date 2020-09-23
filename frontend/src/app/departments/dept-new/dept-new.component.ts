import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeptService } from '../dept.service';
import { OrgService } from '../../organizations/org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dept-new',
  templateUrl: './dept-new.component.html',
  styleUrls: ['./dept-new.component.css']
})
export class DeptNewComponent implements OnInit {

  data = [];

  authForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    owner: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    organization: new FormControl('', [
      Validators.required,
    ]),
    workingTime: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    workingDays: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
  });

  constructor(
    private deptService: DeptService,
    private orgService: OrgService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.orgService.getOrganizations()
     .subscribe((orgs) => {
       this.data = orgs.organizations;
       console.log(this.data)
     })
  }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.deptService.addDept(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/departments')
      },
      error: (err) => {
        this.authForm.setErrors({
          unknownError: true
        });
        
      }
    });
  }

}
