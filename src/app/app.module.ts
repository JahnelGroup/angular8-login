import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Ng2ImgMaxModule } from 'ng2-img-max';

import {HomeComponentComponent} from './home-component/home-component.component';
import { RegistrationComponentComponent } from './registration-component/registration-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { WelcomeComponentComponent } from './welcome-component/welcome-component.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyMaterialModule } from './material.module';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponentComponent } from './navbar-component/navbar-component.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';

import {BasicAuthInterceptor} from './basic-auth/basic-auth.interceptor';
import { PostItemComponentComponent } from './post-item-component/post-item-component.component';
import { UserViewComponent } from './user-view/user-view.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponentComponent,
    LoginComponentComponent,
    WelcomeComponentComponent,
    HomeComponentComponent,
    NavbarComponentComponent,
    PostsComponentComponent,
    PostItemComponentComponent,
    UserViewComponent,
    ImageCropperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MyMaterialModule,
    Ng2ImgMaxModule,
    RouterModule.forRoot([
      { path: '', component: WelcomeComponentComponent, pathMatch: 'full' },
      { path: 'register', component: RegistrationComponentComponent },
      { path: 'login', component: LoginComponentComponent },
      { path: 'home', component: HomeComponentComponent}
    ]),
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
