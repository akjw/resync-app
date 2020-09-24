import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface EmpInfo {
  firstName: string;
  lastName: string;
  dob: string;
  organization: string;
  department: string;
  workTitle: string;
  totalExperience: number;
}

@Injectable({
  providedIn: 'root'
})
export class EmpService {

  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }


  getEmployees() {
    return this.http.get<any>(`${URL}api/employees`,  { headers: {
      "x-auth-token": this.token,
    }})
  }


  getMonthEmps() {
    return this.http.get<any>(`${URL}api/employees/month`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  getYearEmps() {
    return this.http.get<any>(`${URL}api/employees/year`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  addEmp(info: EmpInfo){
    return this.http
    .post<any>(`${URL}api/employees/new`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  getEmp(id: string){
    return this.http.get<any>(`${URL}api/employees/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  editEmp(id: string, info: EmpInfo){
    return this.http
    .put<any>(`${URL}api/employees/${id}`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  deleteEmp(id: string){
    return this.http.delete<any>(`${URL}api/employees/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }
}
