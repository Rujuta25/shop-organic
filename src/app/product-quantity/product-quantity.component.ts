import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../models/product';
import { ShoppoingCartService } from '../shoppoing-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent{

  @Input('product') product : Products;
  @Input('shopping-cart') mycart : ShoppingCart;
  
    constructor(private shoppingcart : ShoppoingCartService) { }
    
    addToCart()
    {
      this.shoppingcart.addToCart(this.product);
    }
  
    removeFromCart(){
      this.shoppingcart.removeFromCart(this.product);
    }
  
   
    ngOnInit() {
    }
  


}
