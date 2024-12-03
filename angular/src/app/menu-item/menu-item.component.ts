import { Component, Input } from '@angular/core';
import { MenuItem } from '../menu-body/menu-body.component';
@Component({
  selector: 'menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
})
export class MenuItemComponent {
    @Input() data!: MenuItem;
}
