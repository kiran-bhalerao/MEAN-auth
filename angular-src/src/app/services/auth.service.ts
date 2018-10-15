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
    return this.http.post('http://localhost:3000/user/register', user, { headers })
      .pipe(map(res => res.json()));
  }


}
