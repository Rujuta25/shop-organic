import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
products: Products[] = [];
filteredproducts: Products[] = [];
categories$;
category: string;

  constructor(
    route: ActivatedRoute,
    productservice : ProductService, 
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

  ngOnInit() {
  }

}
