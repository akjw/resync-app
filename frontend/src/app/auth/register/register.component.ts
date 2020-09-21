import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueEmail } from '../validators/unique-email';
import { AuthService } from '../auth.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  authForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9]+$/)
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9]+$/)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ], [this.uniqueEmail.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      
    ])
  }, { validators: [this.matchPassword.validate] });

  constructor(
    private matchPassword: MatchPassword,
    private uniqueEmail: UniqueEmail,
    private authService: AuthService 
    ) { }

  // ngOnInit(): void {
  // }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.authService.register(this.authForm.value).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
      },
      error: (err) => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({
            unknownError: true
          });
        }
      }
    });
  }

}
