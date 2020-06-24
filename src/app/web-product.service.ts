import { Injectable } from '@angular/core';
import { Logger } from './logger.service';
import { ProductConstants } from './app-constants/appConstants';

@Injectable({
  providedIn: 'root'
})
export class WebProductService {

  constructor(private logger: Logger,private product,private productConstants: ProductConstants) { }


  getToolBarMenu(){
    this.logger.log("recording backend service");
    
  }
}
