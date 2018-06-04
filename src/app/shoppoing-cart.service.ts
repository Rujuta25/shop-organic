import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Products } from './models/product';
import 'rxjs/operator/take'

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
       async getcartId(){
         let cartId = await this.getOrCreateCartId();
       return this.db.object('/shopping-cart/' + cartId);
     }

     private async getOrCreateCartId(): Promise<string>{
       let cartId = localStorage.getItem('cartId');
       if(cartId) return cartId;

         let result = await this.create();
         localStorage.setItem('cartId', result.key);
         return result.key;
       
       
     }

     async addToCart(product : Products){
         let cartId = await this.getOrCreateCartId();
         let items$ =  this.getItem(cartId, product.$key);
          items$.take(1).subscribe(item => {

          items$.update({product: product, quantity : (item.quantity || 0) + 1 });

          });

     }
}
