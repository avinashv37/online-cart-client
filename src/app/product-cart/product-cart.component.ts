import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MenuConstants } from '../app-constants/appConstants';
import { ProductService } from '../shared-service/product.service';
import { Product } from '../shared-models/product.model';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {

  cartItems = Array<Product>();
  productItem = Array<Product>();
  addCartIcon = this.appconstant.productListConfig.addCartIcon;
  removeCartIcon = this.appconstant.productListConfig.removeCartIcon;
  total;
  ngOnInit() {
    this.cartItems = this.productService.getCartProducts();
    this.productService.sendProductRequest().subscribe((data: any[]) => {
      this.productItem = data;
      this.productService.syncItemQty(this.cartItems, this.productItem);
    });
  }

  addProductItem(item: Product) {
    const cartItems = this.productService.changeCartQty(this.productItem, this.cartItems, item, 1);
    this.total=this.productService.total;
  }

  addCartItem(item: Product) {
    const cartItems = this.productService.changeCartQty(this.cartItems, this.productItem, item, 1);
    this.total=this.productService.total;
  }

  removeCartItem(item: Product) {
    const cartItems = this.productService.changeCartQty(this.cartItems, this.productItem, item, -1);
    this.total=this.productService.total;
    if (item.cartQty == undefined) {
      this.ngOnInit();
    }
  }

  drop(event: any) {
    let container: String;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (!event.previousContainer.data.productId == event.container.data.productId) {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        container = event.container.element.nativeElement.getAttribute('aria-label')
        this.addCartData(event.container.data[event.currentIndex], container);
      } else if (event.container.element.nativeElement.getAttribute('aria-label') == 'cart') {
        if(event.previousContainer.data[event.previousIndex].cartQty===undefined){
          this.addProductItem(event.previousContainer.data[event.previousIndex]);
        }else{
          this.addCartItem(event.previousContainer.data[event.previousIndex]);
        }
      } else {
        const product = event.previousContainer.data[event.previousIndex];
        this.productService.changeCartQty(this.cartItems, this.productItem, product, -1 * product.cartQty)
        this.removeCartItem(event.previousContainer.data[event.previousIndex]);
      }
    }
  }

  addCartData(item: any, ariaLabel: String) {
    if (ariaLabel == 'cart' && item.cartQty == undefined) {
      item.cartQty = 1;
    }
    else if (ariaLabel == 'cart' && item.cartQty > 0) {
      item.cartQty = item.cartQty;
    }
    else {
      item.cartQty = undefined;
    }
  }

  constructor(
    private appconstant: MenuConstants,
    private productService: ProductService) { }
}