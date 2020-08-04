import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../shared-models/product.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
import { UtilityService } from './utility.service';
import { Order } from '../shared-models/order.model';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

// key that is used to access the data in local storageconst 
const STORAGE_KEY = 'local_cart';
@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Array<Product>= new Array();
  cartProducts:Array<Product>= new Array();
  order = new Order();
  total:number=0;
  util = this.utility;
  layout = this.utility.layout;

  setProducts(product: Product[]) {
    this.products = product;
  }

  getProduct() {
    return this.products;
  }

  setCartProducts(cartProducts: Product[]) {
    this.storage.set(STORAGE_KEY,cartProducts);
    this.cartProducts = cartProducts;
  }

  getCartProducts() {
    this.storage.get(STORAGE_KEY);
    return this.cartProducts;
  }
  
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendProductRequest(search?:string) {
    let REST_API='';
    if(search==undefined || search==''){
      REST_API = 'http://localhost:3000/products';}
    else{
      REST_API = 'http://localhost:3000/searchProducts/'+search;}

    return this.httpClient.get(REST_API)
      .pipe(map((data: Product[]) => {
        return data;
      }), catchError(this.handleError));
  }

  // Syncs the cartQty of items passed
  syncItemQty(syncFrom: any, syncTo: any){
    if((syncTo!= undefined && syncTo.length==0) && syncFrom!= undefined){
      syncFrom.filter(function(ele){
        if(ele.cartQty>0){
          syncTo.push(ele);
        }
      });
    }else if((syncFrom!= undefined && syncFrom.length==0)  && syncTo!= undefined){
      syncTo.filter(function(ele){
        if(ele.cartQty>0){
          syncFrom.push(ele);
        }
      });
    } else if(syncFrom==undefined || syncTo ==undefined){
        console.log("no value in object sync from , cannot sync");
    }
    else {
      for (var index in syncFrom){
        let item = syncFrom[index]
        syncTo.filter(function(ele){ 
            if(ele.productId == item.productId && ele.cartQty == undefined 
              && item.cartQty!=undefined || ele.productId == item.productId ){
              ele.cartQty =item.cartQty;
              ele.totalPrice=item.totalPrice;
              if(ele.cartQty==null){
                console.log(ele);
                syncFrom.splice(index,1);
              }

            }
        });
      }
    }
    this.total=this.order.getTotal();
  }

  changeCartQty(fromItem, toItem, item: Product, qty: number) {
    if(true && item.cartQty>=this.util.getMaxQty() && qty >0){
      console.log("max quantity of items set to :"+this.util.getMaxQty())
      return;
    }
    const check=this.arrayExistCheck(toItem,item)

    if ((item.cartQty === undefined || item.cartQty ==null) && qty >0) {

      if(check.length!=0 && check.cartQty != undefined ){
        this.changeCartQty(fromItem, toItem,check[0],qty);
      }else{
        item.cartQty = 1;
        if(toItem==undefined){
          toItem=[];
        }
        toItem.push(item);
      }
    }
     else if (item.cartQty > 0) {
      item.cartQty = item.cartQty + qty;
      this.syncItemQty(fromItem,toItem);
      
      if (item.cartQty == 0 || item.cartQty ==null) {
        item.cartQty = undefined;
        this.setCartProducts(this.arrayRemove(this.getCartProducts(),item));
      }
    }
  
    item.totalPrice=item.cartQty*item.price;
    if(!isNaN(this.order.getTotal())){
      this.total=this.order.getTotal()
    }
    this.total=item.price+this.total;
    this.order.setTotal(this.total);
    this.order.setCart(this.getCartProducts());
    console.log("total:"+this.total+"|"+this.order.getTotal())
  }
    

  checkInputValue(event: any, item) {
    const targetVal:number= event.target.value+event.key;
    if (targetVal <= 0) {
      event.target.value = '';
    } else if (targetVal > 15) {
      alert("value exceeds 15");
      this.changeCartQty(this.products,this.getCartProducts(),item, -1*event.target.value);
      // event.target.value = '';
    } else {
      event.target.value = '';
      this.changeCartQty(this.products, this.getCartProducts(), item, event.target.value);
    }
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele){ 
      return ele.productId != value.productId && value.cartQty==undefined; });
 }

 arrayExistCheck(arr, value) {
  return arr.filter(function(ele){ 
    if( ele.productId == value.productId){
      return value;
    }
  });
}

constructor(private httpClient: HttpClient,
  private utility: UtilityService,@Inject(LOCAL_STORAGE) private storage: StorageService) {
  this.cartProducts = [];
}

}
