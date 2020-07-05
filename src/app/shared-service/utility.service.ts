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
  isHandset:boolean;isMedium:boolean;isXSmall:boolean;isSmall:boolean;
  isLarge:boolean;isXLarge:boolean;

  layout = this.breakpointObserver.observe([Breakpoints.Handset,Breakpoints.Small,Breakpoints.XSmall,
    Breakpoints.Medium,Breakpoints.Large,Breakpoints.XLarge]).pipe(
    map(({ matches }) => {
      this.isHandset = this.breakpointObserver.isMatched(Breakpoints.Handset)
      this.isMedium = this.breakpointObserver.isMatched(Breakpoints.Medium);
      this.isXSmall = this.breakpointObserver.isMatched(Breakpoints.XSmall);
      this.isSmall = this.breakpointObserver.isMatched(Breakpoints.Small);
      this.isLarge = this.breakpointObserver.isMatched(Breakpoints.Large);
      this.isXLarge = this.breakpointObserver.isMatched(Breakpoints.XLarge);

      if (this.isSmall) {
        const obj=JSON.parse(this.border.getSmall());
        return [obj];
      }else if(this.isHandset || this.isXSmall){
        const obj=JSON.parse(this.border.getXSmall());
        return [obj];
      }else if(this.isMedium){
        const obj=JSON.parse(this.border.getMedium());
        return [obj];
      }else if (this.isLarge){
        const obj=JSON.parse(this.border.getLarge());
        return [obj];
      }else if (this.isXLarge){
        const obj=JSON.parse(this.border.getXLarge());
        return [obj];
      }else{
        const obj=JSON.parse(this.border.getDefault());
        return [obj];
      }
    })
  );

}