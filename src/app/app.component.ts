import { Component } from '@angular/core';
import { ProductMenuComponent } from './product-menu/product-menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router){}
  title = 'online-cart-client';

  urlToggle(link: String)  {
    this.router.navigate([link]);
  }
}
