
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MenuConstants {
  

  cartProducts = new Array();

  productListConfig={
      addCartIcon:'add_shopping_cart',
      removeCartIcon:'remove_shopping_cart'
  }

  productList={
    products:[
      {
        name:'coconut oil',
        productId:10,
        category:'oil',
        content:'wonderful product',
        offer:'',
        specialOffer:'',
        productType:'food',
        image:'../assets/test_hdd.png',
        price:0,
        stock:false,
      },
        {
        name:'coconut oil',
        productId:11,
        category:'oil',
        content:'wonderful product',
        offer:'',
        specialOffer:'',
        productType:'food',
        image:'../assets/test_hdd.png',
        price:0,
        stock:false
      },
      {
        name:'Noodle',
        productId:12,
        category:'Millet Noodle',
        content:'wonderful product',
        offer:'',
        specialOffer:'',
        productType:'food',
        image:'../assets/test_hdd.png',
        price:0,
        stock:false
        },
      {
        name:'coconut oil',
        productId:13,
        category:'oil',
        content:'wonderful product',
        offer:'',
        specialOffer:'',
        productType:'food',
        image:'../assets/test_hdd.png',
        price:0,
        stock:false
      },
      {
        name:'coconut oil',
        productId:14,
        category:'oil',
        content:'wonderful product',
        offer:'',
        specialOffer:'',
        productType:'food',
        image:'../assets/test_hdd.png',
        price:0,
        stock:false
    },
    {
      name:'coconut oil',
      productId:14,
      category:'oil',
      content:'wonderful product',
      offer:'',
      specialOffer:'',
      productType:'food',
      image:'../assets/test_hdd.png',
      price:0,
      stock:false
  },
  {
    name:'coconut oil',
    productId:14,
    category:'oil',
    content:'wonderful product',
    offer:'',
    specialOffer:'',
    productType:'food',
    image:'../assets/test_hdd.png',
    price:0,
    stock:false
}
    ]
  }

  toolBarMenu ={
    menu:[
      {
        parent:'Millet',
        child:[
          {menu:'Millet Noodles'},
          {menu:'menu2'}
        ]
      },
      {
        parent:'Snacks',
        child:[
          {menu:'chips',icon:'people_outline'},
          {menu:'menu2'}
        ]
      }
    ]
  }
  
  }