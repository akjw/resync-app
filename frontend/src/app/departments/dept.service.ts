import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface DeptInfo {
  description: string;
  organization: string;
  workingTime: string;
  workingDays: string;
}


@Injectable({
  providedIn: 'root'
})
export class DeptService {

  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get<any>(`api/departments`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  getMonthDepts() {
    return this.http.get<any>(`api/departments/month`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  getYearDepts() {
    return this.http.get<any>(`api/departments/year`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  getOrgDepts(id: string){
    return this.http.get<any>(`api/departments/organization/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  addDept(info: DeptInfo){
    return this.http
    .post<any>(`api/departments/new`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  getDept(id: string){
    return this.http.get<any>(`api/departments/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  editDept(id: string, info: any){
    return this.http
    .put<any>(`api/departments/${id}`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  deleteDept(id: string){
    return this.http.delete<any>(`api/departments/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

}
