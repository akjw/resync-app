import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl } from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../auth.service'

@Injectable({
  providedIn: 'root'
})

export class UniqueEmail implements AsyncValidator {
  constructor(private authService: AuthService){}

  validate = (control: FormControl) => {
    const { value } = control;

    return this.authService.emailAvailable(value)
    .pipe(
      map((value) => {
        //don't return object if response of 200
        if(value.available){
          return null
        }
      }),
      catchError((err) => {
        console.log(err)
        if(err.error.email){
          // if response of 422
          return of({ nonUniqueEmail: true })
        }
      })
    );
  }
}
