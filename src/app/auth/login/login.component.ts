import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorResponse: ErrorResponse;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {

    if (this.loginForm.valid) {

      this.errorResponse = null;
      this.authService.login(this.loginForm.value).subscribe((data) => {
        localStorage.setItem('authKey', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/users']);
      }, (err: HttpErrorResponse) => {
        this.errorResponse = err.error;
      });

    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }

  }

}
