import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  User: user;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUser()
      .subscribe((data) => {
        this.User = data;
      });
  }

}
