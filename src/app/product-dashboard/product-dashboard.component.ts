import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MenuConstants } from '../app-constants/appConstants';
import { ProductService } from '../shared-service/product.service';
import { Product } from '../shared-models/product.model';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  public products: Product[];
  cartItem;
  ngOnInit() {
    this.productService.sendProductRequest()
    .subscribe((data: Product[]) => {
      console.log(data);
      this.products = data;  
      this.cartItem =this.productService.getCartProduct(); 
      this.productService.syncItemQty(this.cartItem,this.products);
    });
    this.products = this.productService.products;  
  }
  
 
  cards =this.productService.cards;
  addCartIcon = this.appconstant.productListConfig.addCartIcon; 
  removeCartIcon = this.appconstant.productListConfig.removeCartIcon;

  checkInputValue(event:any,item) {
    if(event.target.value <= 0){
      event.target.value ='';
    }else if(event.target.value>15){
       alert("value exceeds 15");
       event.target.value ='';
    }else{
      event.target.value ='';
      this.productService.changeCartQty(this.products,this.cartItem,item, event.target.value);
    }
  }

  addCart(index) {
    const item=this.productService.changeCartQty(this.products,this.cartItem,index, 1);
    this.productService.setCartProducts(item)
  }

  
  removeCart(index) {
    const item=this.productService.changeCartQty(this.products,this.cartItem,index, -1);
    this.productService.setCartProducts(item)
  }

  constructor(private breakpointObserver: BreakpointObserver,
      private appconstant: MenuConstants,
      private productService: ProductService) { }
}
