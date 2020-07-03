import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Product } from '../shared-models/product.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Array<Product>;
  cartProducts:Product[];

  constructor(private httpClient: HttpClient,private breakpointObserver: BreakpointObserver) {  
    this.cartProducts=[];
   }

  setProducts(product: Product[]){
    this.products=product;
  }

  getProduct(){
    return this.products;
  }

  setCartProducts(cartProducts: Product[]){
    this.cartProducts=cartProducts;
  }

  getCartProduct(){
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

  public sendProductRequest() {
    const REST_API =`http://localhost:3000/products`;
    return this.httpClient.get(REST_API)
    .pipe(map((data: Product[]) => {
      return data;
    }),catchError(this.handleError));
  }

  public fetchProducts(): any{
    this.sendProductRequest().subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;   
    });
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
      for (let item of syncFrom){
        syncTo.filter(function(ele){ 
            // if(ele.cartQty==undefined){
            //   ele.cartQty=0;
            // }
            if(ele.productId == item.productId && ele.cartQty == undefined){
              ele.cartQty =item.cartQty;
            }
            else if(ele.productId == item.productId &&  item.cartQty!=undefined){
            ele.cartQty=item.cartQty;
            }
        })
      }
    }
  }

  changeCartItem(product: Product[],item: Product, count: number){
    let checkedItem=this.arrayChangeCheck(this.cartProducts,item,count);
    if(checkedItem.length==0 && count >0){
      item.cartQty=1;
      this.cartProducts.push(item);
    }else if(checkedItem.length==0 && count<0){
      item.cartQty=undefined;
      this.cartProducts =this.arrayRemove(this.cartProducts,item);
    }
  }

  changeCartQty(fromItem, toItem, item: Product, qty: number) {
    if(true && item.cartQty>=15 && qty >0){
      return item.cartQty;
    }

    if ((item.cartQty === undefined) && qty >0) {
      item.cartQty = 1;
      if(toItem==undefined){
        toItem=[];
      }
      toItem.push(item);
      return toItem;
    }
     else if (item.cartQty > 0) {
      item.cartQty = item.cartQty + qty;
      this.syncItemQty(fromItem,toItem);
      
      if (item.cartQty == 0) {
        item.cartQty = undefined;
        toItem =this.arrayRemove(this.cartProducts,item);
      }
      return toItem;
    }
  }
  
  arrayRemove(arr, value) {
    return arr.filter(function(ele){ 
      return ele.productId != value.productId && value.cartQty==undefined; });
 }

 arrayChangeCheck(arr, value,count:number) {
  return arr.filter(function(ele){ 
    if( ele.productId == value.productId){
      ele.cartQty=ele.cartQty+count;
      return value;
    }
  });
}

  // public getAllProducts(){
  //   this.getProductObs().subscribe(products => this.products =  products);
  // }

    /** Based on the screen size, switch from standard to one column per row */

  cards = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Small,Breakpoints.XSmall,
    Breakpoints.Medium,Breakpoints.Large,Breakpoints.XLarge]).pipe(
    map(({ matches }) => {
      const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset)
      const isMedium = this.breakpointObserver.isMatched(Breakpoints.Medium);
      const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
      const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
      const isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);

      if (isSmall) {
        return [{ cols: 2, rows: 1, gridCols: 6 }]
      }else if(isHandset || isXSmall){
        return [{ cols: 3, rows: 1, gridCols: 6 }]
      }else if(isMedium){
        return [{ cols: 1, rows: 1, gridCols: 4 }]
      }else if (isLarge){
        return [{ cols: 1, rows: 1, gridCols: 5 }];
      }else{
        return [{ cols: 1, rows: 1, gridCols: 6 }];
      }
    })
  );

}
