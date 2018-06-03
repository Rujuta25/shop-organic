import { Component, OnInit, Input } from '@angular/core';
import { Products } from '../models/product';
import { ShoppoingCartService } from '../shoppoing-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
@Input('product') product : Products;
@Input('show-actions') showActions = true;
  constructor(private shoppingcart : ShoppoingCartService) { }

  addToCart(product: Products)
  {
    let cartId = localStorage.getItem('cartId') 
    if(!cartId){
       this.shoppingcart.create().then(result =>
      {
        localStorage.setItem('cartId', result.key);
      });
    }
    else{
      
    }
  }
  ngOnInit() {
  }

}
