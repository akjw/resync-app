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

interface SigninCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signedin$ = new BehaviorSubject(null);

  isAuth = false;

  constructor(private http: HttpClient) { }

  emailAvailable(email: string){
    return this.http.post<{ available: boolean }>(`api/auth/email`, {
      email
    })
  }

  register(credentials: RegisterCredentials){
    return this.http
    .post<any>(`api/auth/register`, credentials)
    .pipe(
        tap(() => {
          this.signedin$.next(true);
        })
      );
  }

  checkAuth(){
    let token = localStorage.getItem('token');
    if(token){
      this.signedin$.next(true);
    } 
    return this.signedin$;
  }

  signout() {
    localStorage.removeItem("token");
    this.signedin$.next(false);
    return this.signedin$;
  }

  signin(credentials: SigninCredentials) {
    return this.http.post<any>(`api/auth/signin`, credentials)
    .pipe(
      tap(() => {
        this.signedin$.next(true);
      })
    )
  }

  getStats(){
    let token = localStorage.getItem('token');
    return this.http.get<any>(`api/auth/stats`,  { headers: {
      "x-auth-token": token,
    }})
  }
}
