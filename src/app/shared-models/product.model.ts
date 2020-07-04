import {Desirializable} from './desirializable.model'

export class Product implements Desirializable{
    public name:string;
    public productId:number;
    public category:string;
    public content:string;
    public offer:string;
    public specialOffer:string;
    public productType:string;
    public image:string;
    public price:number;
    public stock:boolean;
    public cartQty:number;
    public suggested:boolean;


    deserialize(input: any): this {
        return Object.assign(this,input);
    }



}
