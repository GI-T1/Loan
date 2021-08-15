import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCallsService } from 'src/app/services/service-calls.service';

@Component({
  selector: 'app-specific-application',
  templateUrl: './specific-application.component.html',
  styleUrls: ['./specific-application.component.css']
})
export class SpecificApplicationComponent implements OnInit {
  public customerid = Number.parseInt(JSON.stringify(this.service.userid)) //number
  public data1:any;
  public customerData1:any;
  constructor(private router:Router, private route:ActivatedRoute, private service:ServiceCallsService) { }

  async ngOnInit(): Promise<void> {

    this.data1 = await this.service.applicationById(Number.parseInt(this.route.snapshot.paramMap.get("id")!));
    if(this.data1.application.applicationStatus==0){
      this.data1.application.applicationStatus="In Progress"
    }else if(this.data1.application.applicationStatus==1){
      this.data1.application.applicationStatus="Declined"
    }else{
      this.data1.application.applicationStatus="Approved"
    }
    this.customerData1 = await this.service.customerData(this.customerid);

    
  }

}
