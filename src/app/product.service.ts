import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operator/map';

@Injectable()
export class ProductService {

  constructor(private db : AngularFireDatabase) { }

  create(product){

    return this.db.list('/product').push(product);
  }


    getAll()
    {
      return this.db.list('/product');
      
    }


    //get the particular productID from firebase
    getProductId(productId)
    {
      return this.db.object('/product/' + productId)
    }
    
    //update method will run when we pass 2 parameters, id and product object from product-forms component
    update(productId, product)
    {
      //getting the productid and product details from firebase db
      return this.db.object('/product/' + productId).update(product);

    }

    prodDelete(productId)
    {
      return this.db.object('/product/' + productId).remove();
    }

}
