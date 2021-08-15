import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { analyze } from 'eslint-scope';
import { ServiceCallsService } from 'src/app/services/service-calls.service';
@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {

  constructor(private formbuilder:FormBuilder,private router:Router, private service:ServiceCallsService) { }
  public score = 0;
  public loanregex = /^\$\d+(?:.(\d+))?$/;
  //public numericValidation = /^[^a-z ]\ *([.0-9])*\d/;
  //public postalCodeValidation= /\d{6}/;
  
  registerForm: FormGroup | any ;
  submitted = false;
  public custid = Number.parseInt(JSON.stringify(this.service.userid)) //number
  public customerData3:any;
  public customerData2:any;
  checkAge:any;
  todayDate: Date | undefined;
  age: number | undefined;
  annualS:any;
  workExperience: any;
  birthday :any;
  
 async ngOnInit(): Promise<void> {
    this.registerForm = this.formbuilder.group({
      firstName :['',[Validators.required,Validators.maxLength(255)]],
      middleName :['',[Validators.maxLength(255)]],
      lastName : ['',Validators.required,Validators.maxLength(255)],
      dateOfBirth : ['', [Validators.required]],
      emailAddress : ['', [Validators.email, Validators.required]],
      maritalStatus : ['',Validators.required],
      ssnNumber : ['',Validators.required],
      homePhone:['',[Validators.required,Validators.pattern("^\\d{10}$")]],
      officePhone:['',[Validators.required,Validators.pattern("^\\d{10}$")]],
      mobile:['',[Validators.required,Validators.pattern("^\\d{10}$")]],
      loanAmount : ['',Validators.required],
      loanPurpose : ['',Validators.required],
      description : [''],
      addressline1 : ['',[Validators.required,Validators.maxLength(255)]],
      addressline2 : ['',[Validators.maxLength(255)]],
      city : ['',Validators.required,Validators.maxLength(255)],
      state : ['',[Validators.required,Validators.maxLength(255)]],
      postalCode : ['',[Validators.required,Validators.pattern("^\\d{6}$")]],
      employerName :['',[Validators.required,Validators.maxLength(255)]],
      annualSalary : ['',Validators.required], 
      workExpYears:['',Validators.required],
      workExpMonths:['',Validators.required],
      designation : ['',[Validators.maxLength(255)]],
    });
    this.customerData3 = await this.service.customerData(this.custid);

  }

  get h(){
    return this.registerForm.controls;
  }



  async onSubmit(){
    this.registerForm.markAllAsTouched();
    this.submitted = true;
    this.todayDate= new Date();
    this.birthday = new Date(this.registerForm.get('dateOfBirth').value);
    this.checkAge = this.todayDate.getTime()-this.birthday.getTime();
    this.age=Math.ceil(this.checkAge / (1000 * 3600 * 24)) / 365;
    this.workExperience = (this.registerForm.get('workExpYears').value)*12 + (this.registerForm.get('workExpMonths').value);
    this.annualS = this.registerForm.get('annualSalary').value;

    if(this.age<18 || this.workExperience<6 || this.annualS<10000){
      if(this.age<18){
        alert('Your age is less than 18, You are not eligible for the loan process');
        this.router.navigateByUrl('/home');
      }else if(this.workExperience<6){
        alert('Your workexperience is less than 6 months, You are not eligible for the loan process');
        this.router.navigateByUrl('/home');
      }
      else if(this.annualS<10000){
        alert('Your annualSalary is less than 10,000, You are not eligible for the loan process');
        this.router.navigateByUrl('/home');
      }
    }
    if(this.registerForm.invalid){
      alert('Invalid Form');
      this.submitted = false;
    }
    if(this.submitted == true) { alert("Successfully Submitted\n");

     var applicationData:any = {};
     var addressData:any={};
     var loanData:any={};
     var employmentAddress:any={};
     

     addressData["addressId"] = String(this.service.addressIdResponse);
     addressData["addressline1"] = this.registerForm.get('addressline1').value;
     addressData["addressline2"] = this.registerForm.get('addressline2').value;
     addressData["city"] = this.registerForm.get('city').value;
     addressData["state"] = this.registerForm.get('state').value;
     addressData["postalCode"] = Number.parseInt(this.registerForm.get('postalCode').value);

     employmentAddress["addressId"] = String(this.service.employentIdResponse);
     employmentAddress["addressline1"]=this.registerForm.get('addressline1').value;
     employmentAddress["addressline2"]=this.registerForm.get('addressline2').value;
     employmentAddress["city"]=this.registerForm.get('city').value;
     employmentAddress["state"]=this.registerForm.get('state').value;
     employmentAddress["postalCode"]=Number.parseInt(this.registerForm.get('postalCode').value);




     applicationData["customerId"]=Number.parseInt(this.service.userid);
     applicationData["firstName"]= this.registerForm.get('firstName').value;
     applicationData["middleName"]= this.registerForm.get('middleName').value;
     applicationData["lastName"] =this.registerForm.get('lastName').value;
     applicationData["dateOfBirth"]= new Date(this.registerForm.get('dateOfBirth').value).getTime();
     applicationData["maritalStatus"]= this.registerForm.get('maritalStatus').value;
     applicationData["ssnNumber"]= Number.parseInt(this.registerForm.get('ssnNumber').value);
     applicationData["homePhone"] =this.registerForm.get('homePhone').value;
     applicationData["officePhone"] =this.registerForm.get('officePhone').value;
     applicationData["emailAddress"]= this.registerForm.get('emailAddress').value;
     applicationData["address"]=addressData;
     applicationData["employerName"]= this.registerForm.get('employerName').value;
     applicationData["annualSalary"]= Number.parseInt(this.registerForm.get('annualSalary').value); 
     applicationData["workExpMonths"]= Number.parseInt(this.registerForm.get('workExpMonths').value);
     applicationData["workExpYears"]= Number.parseInt(this.registerForm.get('workExpYears').value);
     applicationData["designation"]=this.registerForm.get('designation').value;
     applicationData["employmentAddressId"]=String(this.service.employentIdResponse);
     applicationData["employmentAddress"]=employmentAddress;
     applicationData["mobile"]= this.registerForm.get('mobile').value;

     loanData["loanAmount"]=Number.parseInt(this.registerForm.get('loanAmount').value);
     loanData["loanPurpose"]=this.registerForm.get('loanPurpose').value;
     loanData["description"]=this.registerForm.get('description').value;
     loanData["customerId"]=Number.parseInt(this.service.userid);
     loanData["applicantName"]= this.registerForm.get('firstName').value + " " + this.registerForm.get('lastName').value ;
     loanData["applicationStatus"] = 0; //In process

     console.log(this.service.userid);
     console.log(this.service.addressIdResponse);
     


    await  this.service.submitApplication(applicationData); 
    await  this.service.putLoanApplication(loanData);

      loanData["applicationId"]=Number.parseInt(this.service.applicationresponse["applicationId"]);
        if(this.service.bureauresponse.year==0){
          loanData["declineReason"] = "SSN is not available"
          loanData["applicationStatus"] = 1;    //Declined
          loanData["score"] = 0;

        }else{
          await  this.service.bureauService(this.service.bureauresponse);
          this.score = this.service.bureauscore;
          console.log(this.score);
          if(this.score<680){
            loanData["declineReason"] = "Insufficient Score";
            loanData["applicationStatus"] = 1;   //Declined
            loanData["score"] = this.score;
          }else{
          loanData["declineReason"] = "None";
          loanData["applicationStatus"] = 2;    //Accepted
          loanData["score"] = this.score;
        }
    }
      this.service.updateApplication(loanData);
      this.router.navigateByUrl('/success-submit');

  }
}

  onReset(){
    this.submitted = false;
    this.registerForm.reset();
  }

}
