import { Component, OnInit } from '@angular/core';
import { MenuConstants } from '../app-constants/appConstants';
import { ProductService } from '../shared-service/product.service';
import { Product } from '../shared-models/product.model';
import { Layout } from '../shared-models/layout.model';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';

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
  search="";
  cards = this.utility.layout;
  productCall;
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      params => {
    this.productCall=this.productService.sendProductRequest(this.search)
      .subscribe((data: Product[]) => {        
        this.products = data;
        this.cartItem = this.productService.getCartProducts();
        this.productService.syncItemQty(this.cartItem, this.products);
      });
    });

    this.setLayout(this.utility.border)
    this.cards = this.utility.layout;
    this.products = this.productService.products;
  }

  ngOnDestroy(){
    this.productCall.unsubscribe();
  }

  setLayout(layout: Layout) {
    layout.setHandset('{ "cols": 1, "rows": 1, "gridCols": 2 }');
    layout.setXSmall('{ "cols": 1, "rows": 1, "gridCols": 2 }');
    layout.setSmall('{ "cols": 1, "rows": 1, "gridCols": 3 }');
    layout.setMedium('{ "cols": 1, "rows": 1, "gridCols": 4 }');
    layout.setLarge('{ "cols": 1, "rows": 1, "gridCols": 5}');
    layout.setXLarge('{ "cols": 1, "rows": 1, "gridCols": 6}');
  }
  
  checkInputValue(event: any, item) {
    this.productService.checkInputValue(event, item);
  }

  addCart(index) {
    const item=this.productService.changeCartQty(this.products,this.cartItem,index, 1);
  }

  
  removeCart(index) {
    const item=this.productService.changeCartQty(this.products,this.cartItem,index, -1);
  }

  constructor(
    private appconstant: MenuConstants,
    private productService: ProductService,
    private router:Router, private activatedRoute:ActivatedRoute) {
      if(this.router.getCurrentNavigation().extras.state !== undefined){
        this.search=this.router.getCurrentNavigation().extras.state.stateJson.search;
      }
     }
}
