import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrgService } from '../org.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-org-new',
  templateUrl: './org-new.component.html',
  styleUrls: ['./org-new.component.css']
})
export class OrgNewComponent implements OnInit {

  authForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    state: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[A-Za-z0-9- ]+$/)  
    ])
  });

  constructor(
    private orgService: OrgService,
    private router: Router 
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.authForm.invalid){
      return;
    }
    this.orgService.addOrg(this.authForm.value).subscribe({
      next: () => {
        this.router.navigateByUrl('/organizations')
      },
      error: (err) => {
        this.authForm.setErrors({
          unknownError: true
        });
        
      }
    });
  }

}
