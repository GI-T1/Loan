import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceCallsService } from 'src/app/services/service-calls.service';


@Component({
  selector: 'app-view1',
  templateUrl: './view1.component.html',
  styleUrls: ['./view1.component.css']
})
export class View1Component implements OnInit {

  constructor(private service:ServiceCallsService,private router:Router) { }
  public UserId = Number.parseInt(JSON.stringify(this.service.userid)) ; //customer Id;
  data2:any;

  async ngOnInit() {
    const data = await this.service.userApplications(this.UserId);
    this.data2 = data;
    this.data2.forEach((x: any) => {     
      if(x.applicationStatus==0){
        x.applicationStatus="In Progress"
      }else if(x.applicationStatus==1){
        x.applicationStatus="Declined"
      }else{
        x.applicationStatus="Approved"
      }
    });
  }

  
  public onSelect(id:number):any{
    this.router.navigate(['/myApplication/'+id])
  }
}
