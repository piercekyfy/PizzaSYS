import { Component, Input } from '@angular/core';

export class MenuItem {
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
  selector: 'menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
    @Input() data!: MenuItem;
}
