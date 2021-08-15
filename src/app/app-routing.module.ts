import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './components/application/application.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { HomeComponent } from './components/home/home.component';
import { Home1Component } from './components/home1/home1.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SpecificApplicationComponent } from './components/specific-application/specific-application.component';
import { SubmitComponent } from './components/submit/submit.component';
import { ViewComponent } from './components/view/view.component';
import { View1Component } from './components/view1/view1.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {
    path: 'home',
    component : HomeComponent
  },
  {
    path : 'view',
    component : ViewComponent
  },
  {
    path : 'applications/:id',
    component : ApplicationComponent
  },
  {
    path: 'submit', 
    component : SubmitComponent

  },
  {
    path: 'success-submit', 
    component: ConfirmComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path : 'signUp',
    component:SignupComponent
  },
  {
    path:'logOut',
    component : LogOutComponent
  },
  {
    path:'home1',
    component:Home1Component
  },
  {
    path:'myApplication/:id',
    component:SpecificApplicationComponent
  },{
    path:'view1',
    component:View1Component
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
