import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/autologin.guard';

const routes: Routes = [
  {path: '', canActivate: [AutoLoginGuard], loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'users', canActivate: [AuthGuard], loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
