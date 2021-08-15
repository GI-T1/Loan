import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ServiceCallsService } from 'src/app/services/service-calls.service';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm:FormGroup|any;
  submitted=false;
  userType = ''             //'Banker','Applicant',''
  userId ="";

  constructor(private formBuilder : FormBuilder,private router:Router,private service:ServiceCallsService,private http: HttpClient) {}

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
  }
  
  get f(){
    return this.registerForm.controls;
 }

 onReset(){
  this.registerForm.reset();
  this.submitted=false;
}

  async loginUser(){
    this.submitted = true;
    if(this.registerForm.invalid){
    return;
   }

    //here goes the service call for user's identification
  //    const value = await this.service.checkUsername(this.registerForm.get('username').value)
  //    console.log(value);
  //    if(value!=='false'){
    const password = await this.service.checkUserPassword(this.registerForm.get('password').value,this.registerForm.get('username').value);
      if(password==="null"){
        const passwordBanker = await this.service.checkBankerPassword(this.registerForm.get('password').value,this.registerForm.get('username').value);
        if(passwordBanker==="null"){
            this.userType='';
        }else{
            this.userType='Banker';
        }
      }else{
          this.userId = this.service.userid;
          this.userType='Applicant';
      }

    if(this.userType==='Banker') {
      alert("Successfully LoggedIn as a Banker\n");
      this.router.navigate(['/home1'])
    }
    else if (this.userType==='Applicant') {
      alert("Successfully LoggedIn as an Applicant\n");
      this.router.navigate(['/home'])
    }
    else {
      alert("Invalid User\n" + 'Please enter valid Username or Password');
    }
  }

}
