import { Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';


export const routes: Routes = [
    {path:"register",component:RegisterPageComponent,title:"Register"},
    {path:"login",component:LoginPageComponent,title:"Login"},
    {path:"home",component:HomeComponent,title:"Home"},
    {path:"about",component:AboutComponent,title:"About"},
    {path:"products",component:ProductsComponent,title:"Products" },
    {path:"cart",component:CartComponent,title:"Cart"},
    
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"**",redirectTo:"home",title:"Home"}
];
