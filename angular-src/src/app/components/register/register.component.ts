import { AuthService } from './../../services/auth.service';
import { user } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  User: user;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(f) {
    this.User = f.value;
    this.authService.registerUser(this.User)
      .subscribe((data) => {
        if (data.success) {
          this._flashMessagesService.show('You are registered !', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this._flashMessagesService.show('Something went wrong !', { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
  }
}
