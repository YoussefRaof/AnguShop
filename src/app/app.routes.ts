import { Routes } from '@angular/router';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ForgetPasswordPageComponent } from './components/forget-password-page/forget-password-page.component';

import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
// import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
    {path:"register",component:RegisterPageComponent,title:"Register"},
    {path:"login",component:LoginPageComponent,title:"Login"},
    {path:"forgetpass",component:ForgetPasswordPageComponent,title:"Forget Password"},

    // {path:"layout",component:HeaderComponent,title:"Layout"},
    
    {path:"home",component:HomeComponent,title:"Home"},
    {path:"contactus",component:AboutComponent,title:"Contact Us"},
    {path:"products",component:ProductsComponent,title:"Products" },
    {path:"products/:id",component:ProductDetailsComponent,title:"ProductDetails"},
    {path:"cart",component:CartComponent,title:"Cart"},

    {path:"error",component:ErrorPageComponent,title:"Error"},
    
    {path:"",redirectTo:"login",pathMatch:"full"},
    {path:"**",redirectTo:"error",title:"Error"}
];
