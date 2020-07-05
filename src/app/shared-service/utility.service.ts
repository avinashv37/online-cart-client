import { Injectable } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Display } from '../shared-models/display.model';
import { Layout } from '../shared-models/layout.model';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(private breakpointObserver: BreakpointObserver) { }
/** Based on the screen size, switch from standard to one column per row */
  /** TODO:currently only used in Dashbpard page needs to be extended to make it senderable in other pages using config */
  
  display:Display;
  border = new Layout();
  large:string;
  layout = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Small,Breakpoints.XSmall,
    Breakpoints.Medium,Breakpoints.Large,Breakpoints.XLarge]).pipe(
    map(({ matches }) => {
      const isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset)
      const isMedium = this.breakpointObserver.isMatched(Breakpoints.Medium);
      const isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
      const isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
      const isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
      const isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);

      if (isSmall) {
        const obj=JSON.parse(this.border.getSmall());
        return [obj];
      }else if(isHandset || isXSmall){
        const obj=JSON.parse(this.border.getXSmall());
        return [obj];
      }else if(isMedium){
        const obj=JSON.parse(this.border.getMedium());
        return [obj];
      }else if (isLarge){
        const obj=JSON.parse(this.border.getLarge());
        return [obj];
      }else if (isXLarge){
        const obj=JSON.parse(this.border.getXLarge());
        return [obj];
      }else{
        const obj=JSON.parse(this.border.getDefault());
        return [obj];
      }
    })
  );

}