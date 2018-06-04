import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';

import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppoingCartService } from '../shoppoing-cart.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
 

  products: Products[] = [];
filteredproducts: Products[] = [];
categories$;
category: string;
cart: any;
subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productservice : ProductService, 
    private shoppingcart : ShoppoingCartService
   ) {
    
      productservice
      .getAll()
      .switchMap(products => {
        this.products = products
        return route.queryParamMap;
      })
        
        .subscribe( params => {
          this.category = params.get('category');
    
          this.filteredproducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
        });

         
    
   }

  async ngOnInit() {
    this.subscription =  (await this.shoppingcart.getcartId()).subscribe(cart => this.cart = cart);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
