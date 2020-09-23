import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DeptService } from '../dept.service';
import { Router, ActivatedRoute } from '@angular/router';

interface Dept {
  _id: string;
  description: string;
  workingTime: string;
  workingDays: string;
}

@Component({
  selector: 'app-dept-edit',
  templateUrl: './dept-edit.component.html',
  styleUrls: ['./dept-edit.component.css']
})
export class DeptEditComponent implements OnInit {
  description = '';
  workingDays = '';
  workingTime = '';
  id: string;
  dept: Dept;

  authForm = new FormGroup({
    description: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
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
    private router: Router,
    private actRoute: ActivatedRoute
  ) { 
    this.id = this.actRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.deptService.getDept(this.id)
    .subscribe((dept) => {
      this.populateForm(dept.department)
      console.log(dept)
    })
  }

  populateForm(dept){
    this.authForm.patchValue({
      description: dept.description,
      workingDays: dept.workingDays,
      workingTime: dept.workingTime,
    })
  }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.deptService.editDept(this.id, this.authForm.value).subscribe({
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
