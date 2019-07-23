import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponentComponent } from './home-component/home-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';

import { AuthGuardService } from './auth-guard/auth-guard.service';

const routes: Routes = [
  { path: '', component: WelcomeComponentComponent },
  { path: 'login', component: LoginComponentComponent },
  { path: 'register', component: RegistrationComponentComponent },
  { path: 'home', component:HomeComponentComponent, canActivate: [AuthGuardService] },
  { path: 'posts', component:PostsComponentComponent, canActivate: [AuthGuardService] },

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
