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

  ngOnInit() {

    this.productService.sendProductRequest().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });

  }

  /** Based on the screen size, switch from standard to one column per row */
  gridCols=6;
  
  cards = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Small,Breakpoints.XSmall,
    Breakpoints.Medium,Breakpoints.Large,Breakpoints.XLarge]).pipe(
    map(({ matches }) => {
      const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset)
      const isMedium = this.breakpointObserver.isMatched(Breakpoints.Medium);
      const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
      const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);

      if (isSmall) {
        this.gridCols=6;
        return [{ cols: 2, rows: 1 }]
      }else if(isHandset || isXSmall){
        this.gridCols=6;
        return [{ cols: 3, rows: 1 }]
      }else if(isMedium){
        this.gridCols=4;
        return [{ cols: 1, rows: 1 }]
      }else{
        this.gridCols=6;
        return [{ cols: 1, rows: 1 }];
      }
    })
  );

  addCartIcon = this.appconstant.productListConfig.addCartIcon;
  removeCartIcon = this.appconstant.productListConfig.removeCartIcon;

  checkInputValue(event:any) {
    event.target.value = (event.target.value <= 0)? '' : event.target.value;
    event.target.value = (event.target.value>15)? alert("value exceeds 15") : event.target.value;
  }

  addCart(index) {
    this.productService.changeCartQty(this.products,index, 1);
  }

  
  removeCart(index) {
    this.productService.changeCartQty(this.products,index, -1);
    console.log(this.productService.cartProducts);
  }

  constructor(private breakpointObserver: BreakpointObserver,
      private appconstant: MenuConstants,
      private productService: ProductService) { }
}
