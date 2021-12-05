import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { IconDefinition } from '@ant-design/icons-angular';
import { LockOutline, UserOutline, MailOutline, SearchOutline } from '@ant-design/icons-angular/icons';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';

const icons: IconDefinition[] = [ LockOutline, UserOutline, MailOutline, SearchOutline ];
@NgModule({
  declarations: [UserListComponent, EditUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzIconModule.forChild(icons),
    NzButtonModule,
    NzAlertModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzAvatarModule,
    NzFormModule,
    NzInputModule,
    NzDrawerModule,
    NzMessageModule,
    NzSwitchModule,
    NzSelectModule
  ]
})
export class UserModule { }
