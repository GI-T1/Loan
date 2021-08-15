import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiceCallsService } from 'src/app/services/service-calls.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  customerid:any
  data:any;
  public customerData:any;
  constructor(private router:Router, private route:ActivatedRoute, private service:ServiceCallsService) { }

  async ngOnInit(): Promise<void> {
    const applictaionRespone = await this.service.applicationById(Number.parseInt(this.route.snapshot.paramMap.get("id")!));
    this.data = applictaionRespone;
    if(this.data.application.applicationStatus==0){
      this.data.application.applicationStatus="In Progress"
    }else if(this.data.application.applicationStatus==1){
      this.data.application.applicationStatus="Declined"
    }else{
      this.data.application.applicationStatus="Approved"
    }
    this.customerid = Number.parseInt(applictaionRespone.application['customerId']);
    this.customerData = await this.service.customerData(this.customerid);
  }

}
