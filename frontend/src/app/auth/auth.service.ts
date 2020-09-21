import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;

}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedin$ = new BehaviorSubject(false);

  isAuth = false;

  constructor(private http: HttpClient) { }

  emailAvailable(email: string){
    return this.http.post<{ available: boolean }>(`${environment.API_URL}/auth/email`, {
      email
    })
  }

  register(credentials: RegisterCredentials){
    return this.http
    .post<any>(`${environment.API_URL}/auth/register`, credentials)
    .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth(){
    // return this.http.get(`${environment.API_URL}/signedin`)
    // .pipe(
    //   tap((response) => {
    //     console.log(response)
    //   })
    // )
    let token = localStorage.getItem('token');
    if(token){
      this.signedin$.next(true);
      // this.isAuth = true;
    } 
    return this.signedin$;
  }

  signout() {
    localStorage.removeItem("token");
    this.signedin$.next(false);
    return this.signedin$;
  }
}