import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuComponent } from './menu/menu.component';
import { MenuBodyComponent } from './menu-body/menu-body.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import 'zone.js';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    MenuComponent,
    MenuBodyComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [MenuComponent]
})
export class AppModule { }
