import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceCallsService {

  constructor(private http: HttpClient) { }

  /* ----------------    All service calls will be made from here      ---------------- */
  serviceUrl:string="http://localhost:8080/apis/application";
  applicationUrl:string="http://localhost:8080/apis/application";
  Users={}
  userid:any;
  response = {
    check:Boolean
  }

  addressIdResponse:any;
  customerIdResponse:any;
  firstName:any;
  lastName:any;
  dateOfBirth:any;
  maritalStatus:any;
  ssnNumber:any;
  employentIdResponse:any;

  bureauresponse:any;
  applicationresponse:any
  bureauscore:any;

  public getApplications() {
    return this.http.get(this.serviceUrl);
  }

  public getApplication(id:number):any{
    return this.http.get(this.serviceUrl+"/"+id);
  }

  public saveApplication(application:any){
      return this.http.post(this.applicationUrl,application).pipe(
        map((res:any)=>{
          return res.json();
        },(err: any)=>{
          console.error(err);
        })
      );
  }

 public async checkUsername(username:String):Promise<String>{
     console.log(username)
     return await this.http.get("http://localhost:8080/apis/users/usernameExists"+"/"+username).toPromise().then((res:any)=>{
        console.log(res);
        return JSON.stringify(res['usernameExists']);
      });
  }
  public async checkBanker(username:String):Promise<String>{
    return await this.http.get("http://localhost:8080/apis/admin/usernameExists/"+username).toPromise().then((res:any)=>{
      console.log(res);
      return JSON.stringify(res['usernameExists']);
      });
  }


  public async checkUserPassword(password:String,userName:String):Promise<String>{
    return await this.http.get("http://localhost:8080/apis/users/username/"+userName).toPromise().then((res:any)=>{
        console.log(res);
        this.userid = res.customer['customerId'];
       this.addressIdResponse = res.customer['addressId'];
       this.firstName=res.customer['firstName'];
           this.lastName=res.customer['lastName'];
          this.dateOfBirth=res.customer['dateOfBirth'];
          this.maritalStatus=res.customer['maritalStatus'];
          this.ssnNumber=res.customer['ssnNumber'];
          this.employentIdResponse=res.customer['employmentAddressId'];
       console.log(this.userid);
        return JSON.stringify(res.customer['password']);
    });
  }

  public async checkBankerPassword(password:String,userName:String):Promise<String>{
    return await this.http.get("http://localhost:8080/apis/admin/"+userName).toPromise().then((res:any)=>{
      console.log(res);
      return JSON.stringify(res.banker['password'])
    });
  }

  public saveUser(User:any){
    const httpOptions = {
      headers: new HttpHeaders({'Content-type':'application/json'})
    }
      this.http.post("http://localhost:8080/apis/users", User,httpOptions).toPromise().then((res:any)=>{
      });

  } 
    
    public saveBanker(User:any){
      const httpOptions={
        headers:new HttpHeaders({
          'Content-type':'application/json'
        })
      }
      this.http.post("http://localhost:8080/apis/admin",User,httpOptions).toPromise();
    } 

  //with customer id
  public async userApplications(id:Number) : Promise<any>{
    return await this.http.get("http://localhost:8080/apis/application/userId/"+id).toPromise().then((res:any)=>{
      return res.applications;
    }
    );
  }

  public async applicationById(id:Number) : Promise<any>{
    return await this.http.get("http://localhost:8080/apis/application/applicationId/"+id).toPromise().then((res:any)=>{
    return res;
    });
  }

  public async customerData(id:Number) : Promise<any>{
    return await this.http.get("http://localhost:8080/apis/users/userId/"+id).toPromise().then((res:any)=>{
    return res.customer;
    });
  }

  public async allApplications() : Promise<any>{
    return await this.http.get("http://localhost:8080/apis/application").toPromise().then((res:any)=>{
    return res.applications;
    });
  }
  
  public async putLoanApplication(LoanApplication:any){
    const httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    await this.http.post("http://localhost:8080/apis/application",LoanApplication,httpOptions).toPromise().then((res:any)=>{
      this.applicationresponse = res.application;
      this.bureauresponse = res.bureauResponse;
    });
   }

   public async bureauService(BureauData:any):Promise<any>{
    const httpOptions={
      headers:new HttpHeaders({
        'Content-type':'application/json'
      })
    }
    await this.http.post("https://loanmodel.herokuapp.com/predict",BureauData,httpOptions).toPromise().then((res:any)=>{
      this.bureauscore = Number.parseInt(res.score);
    });
   }




    public async submitApplication(ApplicationUser:any){
      const httpOptions={
        headers:new HttpHeaders({
          'Content-type':'application/json'
        })
      }
     this.http.put("http://localhost:8080/apis/users",ApplicationUser,httpOptions).toPromise();
 }

 public updateApplication(Application:any){
  const httpOptions={
    headers:new HttpHeaders({
      'Content-type':'application/json'
    })
  }
  this.http.put("http://localhost:8080/apis/application",Application,httpOptions).toPromise()
 }


}
