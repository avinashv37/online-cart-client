import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { MenuConstants } from '../app-constants/appConstants';
import { ProductService } from '../shared-service/product.service';
import { Product } from '../shared-models/product.model';
import { Layout } from '../shared-models/layout.model';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  public products: Product[];
  private productSer = this.productService;
  private utility = this.productSer.util;
  addCartIcon = this.appconstant.productListConfig.addCartIcon;
  removeCartIcon = this.appconstant.productListConfig.removeCartIcon;

  cartItem;
  cards = this.utility.layout;;
  ngOnInit() {
    this.productService.sendProductRequest()
      .subscribe((data: Product[]) => {
        console.log(data);
        this.products = data;
        this.cartItem = this.productService.getCartProduct();
        this.productService.syncItemQty(this.cartItem, this.products);
      });

    this.setLayout(this.utility.border)
    this.cards = this.utility.layout;
    this.products = this.productService.products;
  }

  setLayout(layout: Layout) {
    layout.setHandset('{ "cols": 2, "rows": 1, "gridCols": 6 }');
    layout.setXSmall('{ "cols": 3, "rows": 1, "gridCols": 6 }');
    layout.setSmall('{ "cols": 1, "rows": 1, "gridCols": 4 }');
    layout.setMedium('{ "cols": 1, "rows": 1, "gridCols": 5 }');
    layout.setLarge('{ "cols": 1, "rows": 1, "gridCols": 6 }')
  }

  checkInputValue(event: any, item) {
    if (event.target.value <= 0) {
      event.target.value = '';
    } else if (event.target.value > 15) {
      alert("value exceeds 15");
      event.target.value = '';
    } else {
      event.target.value = '';
      this.productService.changeCartQty(this.products, this.cartItem, item, event.target.value);
    }
  }

  addCart(index) {
    const item=this.productService.changeCartQty(this.products,this.cartItem,index, 1);
    this.productService.setCartProducts(item)
  }

  
  removeCart(index) {
    const item=this.productService.changeCartQty(this.products,this.cartItem,index, -1);
  }

  constructor(private breakpointObserver: BreakpointObserver,
    private appconstant: MenuConstants,
    private productService: ProductService) { }
}
