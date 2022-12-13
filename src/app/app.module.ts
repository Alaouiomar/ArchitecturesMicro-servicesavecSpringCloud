import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';

import { BillComponent } from './bill/bill.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CustomersComponent,
    BillComponent,
    BillDetailsComponent,
    EditProductComponent,
    NewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
