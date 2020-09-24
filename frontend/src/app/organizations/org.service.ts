import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface OrgInfo {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;

}

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  
  token = localStorage.getItem('token');
  constructor(private http: HttpClient) { }

  getOrganizations() {
    return this.http.get<any>(`${URL}api/organizations`,  { headers: {
      "x-auth-token": this.token,
    }})
  }


  getMonthOrgs() {
    return this.http.get<any>(`${URL}api/organizations/month`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  getYearOrgs() {
    return this.http.get<any>(`${URL}api/organizations/year`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  addOrg(info: OrgInfo){
    return this.http
    .post<any>(`${URL}api/organizations/new`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  getOrg(id: string){
    return this.http.get<any>(`${URL}api/organizations/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  editOrg(id: string, info: OrgInfo){
    return this.http
    .put<any>(`${URL}api/organizations/${id}`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  deleteOrg(id: string){
    return this.http.delete<any>(`${URL}api/organizations/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }
}
