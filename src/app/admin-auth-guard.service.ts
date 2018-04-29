import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private auth : AuthService, private userService : UserService) { }

  canActivate(): Observable<boolean> {

    //get all users
    return this.auth.appUser$
       
      //map if they are admin or not
           .map(appUser => appUser.isAdmin);
    }
}
