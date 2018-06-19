import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Products } from './models/product';
import 'rxjs/operator/take';
import { ShoppingCart } from './models/shopping-cart';
import 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppoingCartService {

  constructor(private db : AngularFireDatabase) { }
      create()
     {
       //creating a list binding in firebase
       return this.db.list('/shopping-cart').push({
         dateCreated:new Date().getTime()
       })
     }
      private getItem(cartId : string,productId: string)
      {
        return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
      }
       async getcartId() : Promise<Observable<ShoppingCart>>{
         let cartId = await this.getOrCreateCartId();
          return this.db.object('/shopping-cart/' + cartId)
          .map(x => new ShoppingCart(x.items));
     }

     private async getOrCreateCartId(): Promise<string>{
       let cartId = localStorage.getItem('cartId');
       if(cartId) return cartId;

         let result = await this.create();
         localStorage.setItem('cartId', result.key);
         return result.key;
       
       
     }

     async addToCart(product : Products){
         this.updateItem(product,1);
     }

     async removeFromCart(product : Products){
      this.updateItem(product, -1);
      }

      private async updateItem(product : Products, change:number)
      {
        let cartId = await this.getOrCreateCartId();
        let items$ =  this.getItem(cartId, product.$key);
         items$.take(1).subscribe(item => {

         items$.update({
           title: product.title, 
           imageUrl:product.imageUrl,
           price: product.price,
           quantity : (item.quantity || 0) + change });

         });
      }
}
