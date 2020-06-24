import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent {
  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [{ cols: 2, rows: 1 }]
      }

      return [
        { product: 'product 1',content: '', image:'', cols: 1, rows: 1 },
        { product: 'product 2', cols: 1, rows: 1 },
        { product: 'product 3', cols: 1, rows: 1 },
        { product: 'product 4', cols: 1, rows: 1 },
        { product: 'product 5', cols: 1, rows: 1 },
        { product: 'product 6', cols: 1, rows: 1 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
