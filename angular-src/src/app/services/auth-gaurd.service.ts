import { FlashMessagesService } from 'angular2-flash-messages';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private _flashMessagesService: FlashMessagesService) { }

    canActivate() {
        console.log(localStorage.getItem('user'));
        if (localStorage.getItem('user')) {
            // logged in so return true
            return true;
        }
        // not logged in so redirect to login page with the return url
        this._flashMessagesService.show('You are not authorized !', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
        return false;
    }
}