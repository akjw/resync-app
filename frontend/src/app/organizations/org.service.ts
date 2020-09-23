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
    return this.http.get<any>(`${environment.API_URL}/organizations`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  addOrg(info: OrgInfo){
    return this.http
    .post<any>(`${environment.API_URL}/organizations/new`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  getOrg(id: string){
    return this.http.get<any>(`${environment.API_URL}/organizations/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }

  editOrg(id: string, info: OrgInfo){
    return this.http
    .put<any>(`${environment.API_URL}/organizations/${id}`, info, { headers: {
      "x-auth-token": this.token,
    }})
  }

  deleteOrg(id: string){
    return this.http.delete<any>(`${environment.API_URL}/organizations/${id}`,  { headers: {
      "x-auth-token": this.token,
    }})
  }
}
