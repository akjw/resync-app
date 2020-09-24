import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeptService } from '../../departments/dept.service';
import { OrgService } from '../../organizations/org.service';
import { EmpService } from '../emp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-new',
  templateUrl: './emp-new.component.html',
  styleUrls: ['./emp-new.component.css']
})
export class EmpNewComponent implements OnInit {
  orgData = [];
  deptData = [];

  authForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    dob: new FormControl('', [
      Validators.required,
    ]),
    organization: new FormControl('', [
      Validators.required,
    ]),
    department: new FormControl('', [
      Validators.required,
    ]),
    workTitle: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    totalExperience: new FormControl(0, [
      Validators.required,
      Validators.pattern(/^[.0-9]+$/)
    ]),
  });

  constructor(
    private deptService: DeptService,
    private orgService: OrgService,
    private empService: EmpService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.orgService.getOrganizations()
    .subscribe((orgs) => {
      this.orgData = orgs.organizations;
    })
  }

  onOrgSelect(e) {
    this.deptService.getOrgDepts(e.target.value)
      .subscribe((depts) => {
        this.deptData = depts.departments;
      })
  }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.empService.addEmp(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/employees')
      },
      error: (err) => {
        this.authForm.setErrors({
          unknownError: true
        });
        
      }
    });
  }

}
