import {Products} from './product';

export class ShoppingCartItem {
    $key : string;
   title:string;
   imageUrl:string;
    price:number;
    quantity: number;

    //constructor(public product : Products , public quantity: number){}

    get totalPrice(){
        return this.price * this.quantity;
    }
}