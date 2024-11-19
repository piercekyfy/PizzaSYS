import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CartListComponent } from './cart-list/cart-list.component';
import 'zone.js';

@NgModule({
  declarations: [
    CartListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CartListComponent]
})
export class AppModule { }
