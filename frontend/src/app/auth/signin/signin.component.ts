import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ])
  })
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.authForm.invalid){
      return;
    }

    this.authService.signin(this.authForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/home')
      },
      error: ({ error }) => {
        if (error.credentials){
          this.authForm.setErrors({ credentials: true});
        }
      }
    });
  }

}
