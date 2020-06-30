import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Product } from '../shared-models/product.model';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public products: Product[];
  cartProducts:Product[];

  constructor(private httpClient: HttpClient) {  
    this.cartProducts=[];
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
    return this.httpClient.get(`http://localhost:3000/products`).pipe(catchError(this.handleError));
  }

  changeCartQty(products,index, qty: number) {
    if(true && products[index].cartQty>=15 && qty >0){
      return products[index].cartQty;
    }

    if (products[index].cartQty === undefined && qty >0) {
      products[index].cartQty = 1;
      this.cartProducts.push(products[index]);
    }
     else if (products[index].cartQty > 0) {
      products[index].cartQty = products[index].cartQty + qty;

      if (products[index].cartQty == 0) {
        products[index].cartQty = undefined;
        this.cartProducts =this.arrayRemove(this.cartProducts,products[index]);
      }
    }
  }
  
  arrayRemove(arr, value) {
    return arr.filter(function(ele){ return ele != value; });
 }

  // public getAllProducts(){
  //   this.getProductObs().subscribe(products => this.products =  products);
  // }

}
