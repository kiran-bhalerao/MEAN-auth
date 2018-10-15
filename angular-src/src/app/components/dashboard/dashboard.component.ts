import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  name: String;
  constructor() { }

  ngOnInit() {
    this.name = JSON.parse(localStorage.getItem('user')).name;
  }

}
