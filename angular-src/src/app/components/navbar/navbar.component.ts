import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
  logout(e) {
    this.authService.logoutUser();
    this._flashMessagesService.show('Logout sucessfuly!', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    if (localStorage.getItem('user'))
      return true;
    return false;
  }
}
