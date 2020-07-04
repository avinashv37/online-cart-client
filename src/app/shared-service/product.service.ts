import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Product } from '../shared-models/product.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { exit } from 'process';
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

  changeCartQty(fromItem, toItem, item: Product, qty: number) {
    if(true && item.cartQty>=15 && qty >0){
      return item.cartQty;
    }
    const check=this.arrayExistCheck(toItem,item)

    if ((item.cartQty === undefined) && qty >0) {

      if(check.length!=0){
        this.changeCartQty(fromItem, toItem,check[0],qty);
      }else{
        item.cartQty = 1;
        if(toItem==undefined){
          toItem=[];
        }
        toItem.push(item);
        return toItem;
      }
    }
     else if (item.cartQty > 0) {
      item.cartQty = item.cartQty + qty;
      this.syncItemQty(fromItem,toItem);
      
      if (item.cartQty == 0) {
        item.cartQty = undefined;
        this.cartProducts =this.arrayRemove(this.cartProducts,item);
      }
      return toItem;
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

  // public getAllProducts(){
  //   this.getProductObs().subscribe(products => this.products =  products);
  // }

  /** Based on the screen size, switch from standard to one column per row */
  /** TODO:currently only used in Dashbpard page needs to be extended to make it senderable in other pages using config */
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
