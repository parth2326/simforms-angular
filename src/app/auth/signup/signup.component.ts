import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  image: File;
  signupForm!: FormGroup;
  errorResponse: ErrorResponse;
  loading = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  // when the file is selected in page
  onFileChange(event): void{
    if (event.target.files && event.target.files.length > 0){
      this.image = event.target.files[0];
    }else{
      this.image = null;
    }
  }

  submitForm(): void {

    if (this.signupForm.valid) {

      const formData: FormData = new FormData();

      if (this.image) {
        formData.append('image', this.image, this.image.name);
      }

      formData.append('firstName', this.signupForm.value.firstName);
      formData.append('lastName', this.signupForm.value.lastName);
      formData.append('email', this.signupForm.value.email);
      formData.append('password', this.signupForm.value.password);

      this.errorResponse = null;
      this.loading = true;
      this.authService.signup(formData).subscribe((data) => {

        localStorage.setItem('authKey', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        this.router.navigate(['/users']);
      }, (err: HttpErrorResponse) => {
        this.loading = false;
        this.errorResponse = err.error;
      });

    } else {
      Object.values(this.signupForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

}
