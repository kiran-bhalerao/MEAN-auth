import { FlashMessagesService } from 'angular2-flash-messages';

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private _flashMessagesService: FlashMessagesService) { }

    canActivate() {
        // logged in so return true
        if (JSON.parse(localStorage.getItem('user'))) {
            return true;
        } else {
            // not logged in so redirect to login page with the return url
            this._flashMessagesService.show('You are not authorized !', { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/login']);
            return false;
        }

    }
}