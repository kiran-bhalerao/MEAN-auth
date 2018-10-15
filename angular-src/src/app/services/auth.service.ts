import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { map } from 'rxjs/operators';
import { user } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  User: user;
  constructor(private http: Http) { }

  registerUser(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('user/register', user, { headers })
      .pipe(map(res => res.json()));
  }

  // devlompent version of registerUser()
  // registerUser(user) {
  //   let headers = new Headers();
  //   headers.append('Content-type', 'application/json');
  //   return this.http.post('http://localhost:3000/user/register', user, { headers })
  //     .pipe(map(res => res.json()));
  // }

  loginUser(user) {
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post('user/login', user, { headers })
      .pipe(map(res => res.json()));
  }

  // devlompent version of loginUser()
  // loginUser(user) {
  //   let headers = new Headers();
  //   headers.append('Content-type', 'application/json');
  //   return this.http.post('http://localhost:3000/user/login', user, { headers })
  //     .pipe(map(res => res.json()));
  // }

  storeUser(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.User = user;
  }

  logoutUser() {
    this.authToken = null;
    this.User = null;
    localStorage.clear();
  }

  getUser() {
    let headers = new Headers();
    this.loadUser();
    headers.append('Authorization', this.authToken);
    headers.append('Content-type', 'application/json');
    return this.http.post('user/profile', null, { headers })
      .pipe(map(res => {
        return res.json();
      }));
  }
  // devlompent version of getUser()
  // getUser() {
  //   let headers = new Headers();
  //   this.loadUser();
  //   headers.append('Authorization', this.authToken);
  //   headers.append('Content-type', 'application/json');
  //   return this.http.post('http://localhost:3000/user/profile', null, { headers })
  //     .pipe(map(res => {
  //       return res.json();
  //     }));
  // }

  loadUser() {
    if (localStorage.getItem('id_token') && JSON.parse(localStorage.getItem('user'))) {
      this.authToken = localStorage.getItem('id_token');
      this.User = JSON.parse(localStorage.getItem('user'));
    }
  }
}


