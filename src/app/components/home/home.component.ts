import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
//import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private router:Router) { }
    //private login:LoginComponent

  //id = this.login.userId;

  ngOnInit(): void {
  }


}
