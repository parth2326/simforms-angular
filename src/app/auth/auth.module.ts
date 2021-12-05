import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { IconDefinition } from '@ant-design/icons-angular';

import { LockOutline, UserOutline, MailOutline } from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [ LockOutline, UserOutline, MailOutline ];

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzCardModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzAlertModule,
    NzGridModule,
  ]
})
export class AuthModule { }
