import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';

import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/product';
import 'rxjs/add/operator/switchMap';
import { ShoppoingCartService } from '../shoppoing-cart.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
 

  products: Products[] = [];
filteredproducts: Products[] = [];
categories$;
category: string;
cart$: Observable<ShoppingCart>;


  constructor(
    private route: ActivatedRoute,
    private productservice : ProductService, 
    private shoppingcart : ShoppoingCartService
   ) {
    }
    async ngOnInit() {
      this.cart$ =  await this.shoppingcart.getcartId();      
      this.populateProducts();
   }

   private populateProducts(){
    
    this.productservice
    .getAll()
    .switchMap(products => {
      this.products = products
      return this.route.queryParamMap;
    })
      
      .subscribe( params => {
        this.category = params.get('category');
        this.applyFilter();
      });

   } 

   private applyFilter(){
    this.filteredproducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
   }
 
}
