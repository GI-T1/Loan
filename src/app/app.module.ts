import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ViewComponent } from './components/view/view.component';
import { ApplicationComponent } from './components/application/application.component';
import { SubmitComponent } from './components/submit/submit.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { Home1Component } from './components/home1/home1.component';
import { SpecificApplicationComponent } from './components/specific-application/specific-application.component';
import { View1Component } from './components/view1/view1.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ViewComponent,
    ApplicationComponent,
    SubmitComponent,
    ConfirmComponent,
    LoginComponent,
    SignupComponent,
    LogOutComponent,
    Home1Component,
    SpecificApplicationComponent,
    View1Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
