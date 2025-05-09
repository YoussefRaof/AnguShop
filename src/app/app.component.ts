import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { DarkModeComponent } from "./components/dark-mode/dark-mode.component";
// import { RegisterPageComponent } from "./Pages/register-page/register-page.component";
// import { LoginPageComponent } from "./Pages/login-page/login-page.component";

// import { ProductsComponent } from "./Pages/products/products.component";
// import { ProductDetailsComponent } from "./Pages/product-details/product-details.component";
// import { CartComponent } from "./Pages/cart/cart.component";
// import { HomeComponent } from './Pages/home/home.component';
// import { HeaderComponent } from "./components/header/header.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DarkModeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AnguShop';

  SendData(evData: any) {
   
  }
}
