import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDetailsComponent} from './user-details/user-details.component';
import {UsersViewComponent} from './users-view/users-view.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'users',
    component:UsersViewComponent,canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component:UserDetailsComponent,canActivate: [AuthGuard]
  },
  {
    path: 'userRegister',
    component:UserComponent,
    children:[
      {path:'regist',component:RegistrationComponent},
      {path:'login',component:LoginComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
