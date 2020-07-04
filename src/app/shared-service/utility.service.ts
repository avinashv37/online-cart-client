import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private breakpointObserver: BreakpointObserver) { }
/** Based on the screen size, switch from standard to one column per row */
  /** TODO:currently only used in Dashbpard page needs to be extended to make it senderable in other pages using config */
  layout = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Small,Breakpoints.XSmall,
    Breakpoints.Medium,Breakpoints.Large,Breakpoints.XLarge]).pipe(
    map(({ matches }) => {
      const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset)
      const isMedium = this.breakpointObserver.isMatched(Breakpoints.Medium);
      const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
      const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
      const isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);

      if (isSmall) {
        return [{ cols: 2, rows: 1, gridCols: 6 }]
      }else if(isHandset || isXSmall){
        return [{ cols: 3, rows: 1, gridCols: 6 }]
      }else if(isMedium){
        return [{ cols: 1, rows: 1, gridCols: 4 }]
      }else if (isLarge){
        return [{ cols: 1, rows: 1, gridCols: 5 }];
      }else{
        return [{ cols: 1, rows: 1, gridCols: 6 }];
      }
    })
  );
}
