
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MenuConstants {
  
  productList={
    products:[
      {
        name:'coconut oil',
        productId:10,
        category:'oil',
        productType:'food',
        image:''
      }
    ]
  }

  toolBarMenu ={
    menu:[
      {
        parent:'parent',
        child:[
          {menu:'menu1'},
          {menu:'menu2'}
        ]
      },
      {
        parent:'parent1',
        child:[
          {menu:'menu1',icon:'people_outline'},
          {menu:'menu2'}
        ]
      }
    ]
  }
  
  }