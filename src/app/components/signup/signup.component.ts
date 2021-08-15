import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ServiceCallsService } from 'src/app/services/service-calls.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm:FormGroup | any;
  BankForm:FormGroup | any;
  submitted=false;
  User:string|any;

  constructor( private formBuilder:FormBuilder,private router:Router,private service:ServiceCallsService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dateOfBirth : ['', Validators.required],
      maritalStatus : ['',Validators.required],
      ssnNumber : ['',Validators.required],
  });

  this.BankForm = this.formBuilder.group({
    
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    employee_id:['',Validators.required]
});
  }

  get f(){
    return this.registerForm.controls;
 }

  get b(){
    return this.BankForm.controls;
  }
  
  onReset(){
    this.registerForm.reset();
    this.BankForm.reset();
    this.submitted=false;
  }


  openForm( user : string){
    this.User = user;
  }



  async registerdUser(){
      this.submitted = true;
      if(this.registerForm.invalid){
         return;
      }
      const response = await this.service.checkUsername(this.registerForm.get('username').value);
      const  s1 = "false";
        if(response === JSON.stringify(s1)){
          alert("Success Signup\n");
          var formData: any ={};
          formData["firstName"]= this.registerForm.get('firstName').value;
          formData["lastName"] =this.registerForm.get('lastName').value;
          formData["username"]= this.registerForm.get('username').value;
          formData["password"]= this.registerForm.get('password').value;
          formData["dateOfBirth"]= new Date(this.registerForm.get('dateOfBirth').value).getTime();
          formData["password"]= this.registerForm.get('password').value;
          formData["maritalStatus"]= this.registerForm.get('maritalStatus').value;
          formData["ssnNumber"]= this.registerForm.get('ssnNumber').value;

          this.service.saveUser(formData);
          this.router.navigate(['/login'])
        }else {
            alert('This username is not available \n' + 'Please enter another username'); 
        }
  }


  async registeredBanker(){
      this.submitted = true;
      if(this.BankForm.invalid){
         return;
      }

      const response = await this.service.checkBanker(this.BankForm.get('username').value);
      const  s1 = "false";
         if(response === JSON.stringify(s1)){
          alert("Success Signup\n");
          var formData :any={};
          formData["username"]= this.BankForm.get('username').value;
          formData["password"]= this.BankForm.get('password').value;
          formData["employee_id"]= this.BankForm.get('employee_id').value;
      
          this.service.saveBanker(formData);
          this.router.navigate(['/login'])
      } else {
        alert('This username is not available \n' + 'Please enter another username'); 
      } 
  }


}