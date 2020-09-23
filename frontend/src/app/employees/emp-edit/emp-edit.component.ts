import { Component, OnInit } from '@angular/core';import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeptService } from '../../departments/dept.service';
import { EmpService } from '../emp.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

interface Emp {
  firstName: string;
  lastName: string;
  dob: string;
  department: string;
  workTitle: string;
  totalExperience: string;
}


@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrls: ['./emp-edit.component.css']
})
export class EmpEditComponent implements OnInit {
  data = [];
  organization: string;
  id: string;
  emp: Emp;

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
    private empService: EmpService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { 
    this.id = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.empService.getEmp(this.id)
    .subscribe((emp) => {
        console.log('org id', emp.employee.organization)
    this.deptService.getOrgDepts(emp.employee.organization._id).subscribe((dept) => {
      this.data = dept.departments
      console.log('data', this.data)
    })
      this.populateForm(emp.employee)
      console.log('emp data', emp.employee)
    })
  }

  populateForm(emp){
    this.authForm.patchValue({
      firstName: emp.firstName,
      lastName: emp.lastName,
      dob: formatDate(emp.dob, 'yyyy-MM-dd', 'en-Sg'),
      department: emp.department._id,
      workTitle: emp.workTitle,
      totalExperience: emp.totalExperience
    })
  }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.empService.editEmp(this.id, this.authForm.value).subscribe({
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
