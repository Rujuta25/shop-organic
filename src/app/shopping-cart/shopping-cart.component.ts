import { Component, OnInit } from '@angular/core';
import { ShoppoingCartService } from '../shoppoing-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$;
  constructor(private shoppingCartService : ShoppoingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getcartId()
  }
  clearCart(){
    this.shoppingCartService.clearCart();  }
}
