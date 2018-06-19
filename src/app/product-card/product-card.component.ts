import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../models/product';
import { ShoppoingCartService } from '../shoppoing-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{
@Input('product') product : Products;
@Input('show-actions') showActions = true;
@Input('shopping-cart') mycart : ShoppingCart;

  constructor(private shoppingcart : ShoppoingCartService) { }
  
  addToCart()
  {
    this.shoppingcart.addToCart(this.product);
  }



}
