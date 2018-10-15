import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  constructor(
    private authService: AuthService,
    private router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }
  onSubmit(f) {
    this.username = f.value.username;
    this.password = f.value.password;
    // console.log(this.username);
    this.authService.loginUser(f.value)
      .subscribe((data) => {
        if (data.success) {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-success', timeout: 3000 });
          this.authService.storeUser(data.token, data.user);
          this.router.navigate(['/dashboard']);
        } else {
          this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
  }

}
