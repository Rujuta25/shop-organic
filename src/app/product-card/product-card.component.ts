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
@Input('shopping-cart') mycart ;

  constructor(private shoppingcart : ShoppoingCartService) { }

  addToCart(product: Products)
  {
    this.shoppingcart.addToCart(product);
  }

  getQuantity(){
    if(!this.mycart) return 0;
    let item = this.mycart.items[this.product.$key];
    return item ? item.quantity : 0;
  }
  ngOnInit() {
  }

}
