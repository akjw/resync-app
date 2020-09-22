import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if (this.authForm.invalid){
      return;
    }

    this.authService.signin(this.authForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
      },
      error: ({ error }) => {
        if (error.credentials){
          this.authForm.setErrors({ credentials: true});
        }
      }
    });
  }

}
