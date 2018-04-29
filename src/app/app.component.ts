import { Component } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
import { UserService } from './user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  constructor( private userService : UserService ,private auth : AuthService)
  {

    auth.user$.subscribe( user => {
      if (user)
      {
        userService.save(user);
      }
    })
  }
}
