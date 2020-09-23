import { Component, OnInit } from '@angular/core';
import { EmpService } from '../emp.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent {
  data = [];
  constructor(private empService: EmpService, private router: Router) { }

  ngOnInit(): void {
    this.empService.getEmployees()
    .subscribe((emps) => {
      this.data = emps.employees;
      console.log(this.data)
    })
  }

  deleteHandler(id){
    var result = confirm("Delete this employee?");
    if (result) {
      this.empService.deleteEmp(id)
      .subscribe(() => this.empService.getEmployees().subscribe((emps) => {
        this.data = emps.employees;
      }))
    }
  }

}
