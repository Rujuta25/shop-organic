import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Products } from '../../models/product';
import { DataTableModule, DataTableResource } from 'angular5-data-table'

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit , OnDestroy {
  
 
  products: Products[] =[];
  tableResource: DataTableResource<Products>;
  items: Products[] = [];
  itemCount: number;
  filteredProducts: any[];
  subscription : Subscription;
 
  constructor(private productService : ProductService) {
    
   this.subscription =  this.productService.getAll().subscribe( products =>  {
    this.filteredProducts = this.products = products;
    this.products = products;
    this.initializeTable(this.products); 
      });
     
          }

          private initializeTable(p: Products[]) {
            this.tableResource = new DataTableResource(p);
            this.tableResource.query({ offset: 0, limit: 10 }).then(items => this.items = items);
            this.tableResource.count().then(count => this.itemCount = count);
          }

          reloadItems(params) {
            if (!this.tableResource) return;
         
            this.tableResource.query(params).then(items => this.items = items);
          }


filter(query : string)
{
  //console.log(query);
  let filteredProducts = (query) ?
  this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    this.initializeTable(filteredProducts);
     
}
   
  ngOnInit() {
  }

  ngOnDestroy() {
     this.subscription.unsubscribe();
  }



}
