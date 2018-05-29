import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router'; 
import 'rxjs/add/operator/take';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  route: any;



  categories$;
  product = {};
  id;

  constructor(
    private routeActivate : ActivatedRoute,
    private router : Router,
    private categoryService : CategoryService, 
    private productService : ProductService) { 

    this.categories$ = categoryService.getCategories();

     //get the snapshot of the id of product when route is activated
     this.id = this.routeActivate.snapshot.paramMap.get('id');

     //use the 'id' snapshot to assign to an angular object
     
     if (this.id) this.productService.getProductId(this.id).take(1).subscribe(p => this.product = p);
  }

  save(product) {
  if (this.id) this.productService.update(this.id, product);
  else this.productService.create(product);
  //console.log(product);  
   this.router.navigate(['/admin-products'])

  }
  

   delete(){
   
    if(!confirm('Are you sure you want to delete this product?')) return;

    this.productService.prodDelete(this.id);
    this.router.navigate(['/admin-products']);
       

   }
 
  ngOnInit() {
  }

}
