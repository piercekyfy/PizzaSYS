import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CartListComponent } from './cart-list/cart-list.component';

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
