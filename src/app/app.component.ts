import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { RegisterPageComponent } from "./components/register-page/register-page.component";
import { LoginPageComponent } from "./components/login-page/login-page.component";

import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductsComponent, ProductDetailsComponent, CartComponent, HomeComponent, RouterModule, HeaderComponent, LoginPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnguShop';

  SendData(evData: any) {
   
  }
}
