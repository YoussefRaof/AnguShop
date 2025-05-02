import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    {path:"home",component:HomeComponent,title:"Home"},
    {path:"about",component:AboutComponent,title:"About"},
    {path:"products",component:ProductsComponent,title:"Products" },
    {path:"cart",component:CartComponent,title:"Cart"},
    {path:"",redirectTo:"home",pathMatch:"full"},
    {path:"**",redirectTo:"home",title:"Home"}
];
