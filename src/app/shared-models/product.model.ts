import {Desirializable} from './desirializable.model'

export class Product implements Desirializable{s
    public name:string;
    public productId:String;
    public category:string;
    public content:string;
    public offer:string;
    public specialOffer:string;
    public productType:string;
    public image:string;
    public price:number;
    public totalPrice:number;
    public stock:boolean;
    public cartQty:number;


    public getCartQty(): number {
        return this.cartQty;
    }

    public setCartQty(cartQty: number): void {
        this.cartQty = cartQty;
    }
    public suggested:boolean;


    deserialize(input: any): this {
        return Object.assign(this,input);
    }



}
