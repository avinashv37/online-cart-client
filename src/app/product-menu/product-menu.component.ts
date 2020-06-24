import { Component, Input, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MenuConstants } from '../app-constants/appConstants';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss']
})
export class ProductMenuComponent {

  themeColor = '';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
      private overlayContainer:OverlayContainer,
      private router:Router,
      private menuConstants: MenuConstants) {}
  
  @HostBinding('class') componentCssClass;

  onSetTheme(theme) {
    this.overlayContainer.getContainerElement().classList.add(theme);
    this.componentCssClass = theme;
  }

   urlToggle(link: String)  {
    this.router.navigate([link]);
  }

  clickHandler(item: string) {
    alert(item);
  }
  
  webTitle='';
  webImage='../assets/test_hdd.png';
  webImageCss={
    'height':'120px', 'width':'200px'
  }
  productDashboard='Dash board';
  productCart='Cart';

  toolBarMenu = this.menuConstants.toolBarMenu.menu;

}
