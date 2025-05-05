import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../Services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,
    RouterModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;
    });
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  checkout(): void {
    alert('Proceeding to checkout with items worth $' + this.cartTotal.toFixed(2));
    console.log('Checkout items:', this.cartItems);
    this.cartService.getCartCount().subscribe(cartcount =>{
      this.cartCount = cartcount
    })
  }
}
