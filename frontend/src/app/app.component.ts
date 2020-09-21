import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  signedin$: BehaviorSubject<boolean>;
  isAuth = false;

  constructor(private authService: AuthService) {
    this.signedin$ = this.authService.signedin$;
  }

  ngOnInit() {
    let result = this.authService.checkAuth();
    if(result){
      this.signedin$ = this.authService.signedin$;
    }
  }

  onSignout() {
    this.authService.signout();
    this.signedin$ = this.authService.signedin$;
  }

}
