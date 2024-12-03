import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../menu-item/menu-item.component';
import { HttpClient } from '@angular/common/http';

import { MenuDataService } from '../menu-data.service';
import { finalize, Observable, share, takeUntil, tap } from 'rxjs';

export class MenuCategory {
    public id: number;
    public title: string;
    public items: MenuItem[];
    public constructor(id: number, title: string, items: MenuItem[]) {
        this.id = id;
        this.title = title;
        this.items = items;
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
        this.http.get<Object>('http://localhost:3000/api/menu', { responseType: 'json'}).toPromise().then(obj => console.log(obj)).catch(err =>  {console.log(err)})
    }
    ngOnInit() {
        //this.service.getMenu().subscribe(x => console.log(x))
        
    }
}
