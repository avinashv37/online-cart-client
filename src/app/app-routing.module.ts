import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductCartComponent } from './product-cart/product-cart.component';

const routes: Routes = [
  {path:'',component:ProductDashboardComponent},
  {path:'product-dashboard',component:ProductDashboardComponent},
  {path:'product-cart',component:ProductCartComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
