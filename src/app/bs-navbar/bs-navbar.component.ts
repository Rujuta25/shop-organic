import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{

//user$ is an observable
  //user$ :  Observable <firebase.User>
 appUser : AppUser;

  constructor(private auth: AuthService) {

    //tells or observes the latest state - logged in or not
    auth.appUser$.subscribe(appUser => this.appUser = appUser);

   }

    logout()
    {
      this.auth.logout();

    }
  }


