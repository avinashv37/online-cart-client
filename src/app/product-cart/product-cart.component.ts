import { Component,ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MenuConstants } from '../app-constants/appConstants';
import { ProductService } from '../shared-service/product.service';
import { Product } from '../shared-models/product.model';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit{

  cartItems=[];

  productItem=[];

  ngOnInit() {
    this.cartItems= this.productService.getCartProduct();
    this.productService.sendProductRequest().subscribe((data: any[]) => {
      this.productItem = data;
      this.productService.syncItemQty(this.cartItems,this.productItem);
      console.log(data);
    });

  }

  addProductItem(item: Product){
    const cartItems = this.productService.changeCartQty(this.productItem,this.cartItems,item, 1);
    this.productService.setCartProducts(cartItems);
    if(item.cartQty==undefined ){
      this.ngOnInit();
    }
  }

  removeProductItem(item: Product){
    const cartItems = this.productService.changeCartQty(this.productItem,this.cartItems,item, -1);
    this.productService.setCartProducts(cartItems);
    if(item.cartQty==undefined){
      this.ngOnInit();
    }
  }

  addCartItem(item: Product){
    const cartItems = this.productService.changeCartQty(this.cartItems,this.productItem,item, 1);
    this.productService.setCartProducts(cartItems);
    if(item.cartQty==undefined ){
      this.ngOnInit();
    }
  }

  removeCartItem(item: Product){
    const cartItems = this.productService.changeCartQty(this.cartItems,this.productItem,item, -1);
    this.productService.setCartProducts(cartItems);
    if(item.cartQty==undefined){
      this.ngOnInit();
    }
  }
addCartIcon = this.appconstant.productListConfig.addCartIcon; 
removeCartIcon = this.appconstant.productListConfig.removeCartIcon;

  drop(event: any) {
    let container:String;
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      container=event.container.element.nativeElement.getAttribute('aria-label')
      this.addCartData(event.container.data[event.currentIndex],container);

    }
  }
  addCartData(item: any,ariaLabel:String){
    if(ariaLabel=='cart' && item.cartQty ==undefined){
      item.cartQty=1;
   }
   else if(ariaLabel=='cart' && item.cartQty >0){
    item.cartQty =item.cartQty;
   }
    else{
      item.cartQty=undefined;
    }
  }

  constructor(private breakpointObserver: BreakpointObserver,
    private appconstant: MenuConstants,
    private productService: ProductService) { }
}
