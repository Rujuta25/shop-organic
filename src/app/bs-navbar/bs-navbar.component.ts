import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { ShoppoingCartService } from '../shoppoing-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  

//user$ is an observable
  //user$ :  Observable <firebase.User>
 appUser : AppUser;
 shoppingCartItemCount : number;
  constructor(private auth: AuthService, private shoppingCart : ShoppoingCartService) {

    //tells or observes the latest state - logged in or not
    
   }

    logout()
    {
      this.auth.logout();

    }

    async ngOnInit(){
      
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      let cart$ = await this.shoppingCart.getcartId();
      cart$.subscribe(cart =>{
        this.shoppingCartItemCount = 0;
        for(let productId in cart.items)
        {
          this.shoppingCartItemCount += cart.items[productId].quantity;
        }
      })
  
    }
  }

  

