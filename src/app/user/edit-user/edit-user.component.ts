import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ErrorResponse } from 'src/app/models/ErrorResponse';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: User;
  image: File;
  editUserForm!: FormGroup;
  errorResponse: ErrorResponse;
  loading = false;

  constructor(private fb: FormBuilder,
              private drawerRef: NzDrawerRef<User>,
              private userService: UserService,
              private messageService: NzMessageService) {

  }

  ngOnInit(): void {
    this.editUserForm = this.fb.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      password: [null, [Validators.minLength(6)]]
    });
  }

  onFileChange(event): void{
    if (event.target.files && event.target.files.length > 0){
      this.image = event.target.files[0];
    }else{
      this.image = null;
    }
  }

  submitForm(): void {

    if (this.editUserForm.valid) {

      const formData: FormData = new FormData();
      formData.append('firstName', this.editUserForm.value.firstName);
      formData.append('lastName', this.editUserForm.value.lastName);

      // if the password is provided
      if (this.editUserForm.value.password && this.editUserForm.value.password.length > 0){
        formData.append('password', this.editUserForm.value.password);
      }

      // if the image is provided
      if (this.image) {
        formData.append('image', this.image, this.image.name);
      }

      this.errorResponse = null;
      this.loading = true;

      this.userService.update(this.user.id.toString(), formData).subscribe((data) => {
        this.user = User.fromMap(data);
        this.loading = false;
        this.messageService.success('User updated successfully');
        this.drawerRef.close(this.user);
      }, (err: HttpErrorResponse) => {
        this.messageService.error('Failed to updated user');
        this.loading = false;
        this.errorResponse = err.error;
      });

    } else {

      Object.values(this.editUserForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });

      this.messageService.warning('Please validate user input');
    }

  }

}
