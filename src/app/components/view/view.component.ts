import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ServiceCallsService } from 'src/app/services/service-calls.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  allData : any;
  constructor(private service:ServiceCallsService,private router:Router) { }

  async ngOnInit(): Promise<void> {
    const values = await this.service.allApplications();
    this.allData = values;
    this.allData.forEach((x: any) => {     
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
    this.router.navigate(['/applications/'+id])
  }

}
