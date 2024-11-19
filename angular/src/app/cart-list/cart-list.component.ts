import { Component, OnInit } from '@angular/core';

export class CartItem {
  public id: number;
  public title: string;
  public price: number;
  public ingredientDesc: string;
  public desc: string;
  public quantity: number;
  public constructor(id: number, title: string, price: number, ingredientDesc: string, desc: string, quantity: number) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.ingredientDesc = ingredientDesc;
    this.desc = desc;
    this.quantity = quantity;
  }
}

@Component({
  selector: 'cart-list',
  standalone: false,
  
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {
  constructor() {};
  cart: CartItem[] = [new CartItem(1, 'Pepperoni Pizza', 14.99, 'Tomato, Cheese, Pepperoni', 'Our famous pepperoni pizza.', 2)];
  ngOnInit() {
    
  }
}
