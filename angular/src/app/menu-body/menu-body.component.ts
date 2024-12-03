import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MenuDataService } from '../menu-data.service';

export class MenuCategory {
    public _id: number;
    public title: string;
    public menuItems: MenuItem[];
    public constructor(_id: number, title: string, menuItems: MenuItem[]) {
        this._id = _id;
        this.title = title;
        this.menuItems = menuItems;
    }
}

export class MenuItem {
    public _id: number;
    public title: string;
    public price: number;
    public ingredientDesc: string;
    public desc: string;
    public quantity: number;
    public constructor(_id: number, title: string, price: number, ingredientDesc: string, desc: string, quantity: number) {
      this._id = _id;
      this.title = title;
      this.price = price;
      this.ingredientDesc = ingredientDesc;
      this.desc = desc;
      this.quantity = quantity;
    }
  }

@Component({
  selector: 'menu-body',
  standalone: false,
  templateUrl: './menu-body.component.html',
  providers: [MenuDataService]
})
export class MenuBodyComponent implements OnInit {
    public data: MenuCategory[] = [ new MenuCategory(1, 'test', [])]
    constructor(private service: MenuDataService, private http: HttpClient) {
        
    }
    ngOnInit() {
        this.service.getMenu().subscribe(x => this.data = x)
    }
}
