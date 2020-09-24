import { Component, OnInit } from '@angular/core';
import { DeptService } from '../dept.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dept-list',
  templateUrl: './dept-list.component.html',
  styleUrls: ['./dept-list.component.css']
})
export class DeptListComponent implements OnInit {
  data = [];
  headers = [
    {key: 'description', label: 'Description'},
    {key: 'owner', label: 'Owner'},
    {key: 'organization', label: 'Organization'},
    {key: 'workingTime', label: 'Working Time'},
    {key: 'workingDays', label: 'Working Days'},
  ];


  constructor(private deptService: DeptService, private router: Router) { }

  ngOnInit(): void {
    this.deptService.getDepartments()
     .subscribe((depts) => {
       this.data = depts.departments;
     })
  }

  deleteHandler(id){
    var result = confirm("Delete this department?");
    if (result) {
      this.deptService.deleteDept(id)
      .subscribe(() => this.deptService.getDepartments().subscribe((depts) => {
        this.data = depts.departments;
      }))
    }
  }

}
