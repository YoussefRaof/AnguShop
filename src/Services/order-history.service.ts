import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
   
  public cartItems: CartItem[] = [];
  public orderCount : number = 0;
  constructor() {
   }
}
