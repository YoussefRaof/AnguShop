import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../../Services/cart.service';
import { RouterModule } from '@angular/router';
import { OrderHistoryService } from '../../../Services/order-history.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  cartCount: number = 0;

  constructor(private cartService: CartService , private OrderHistory :OrderHistoryService) {}

  ngOnInit(): void {
    // Fetch cart items, total and count from CartService
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;  // Assign the cart items to the component variable
    });

    this.cartService.getCartTotal().subscribe(total => {
      this.cartTotal = total;  // Update total price of cart
    });

    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;  // Update number of items in the cart
    });
  }

  // Remove an item from the cart
  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);  // Use the CartService method to remove the item
  }

  // Update the quantity of a specific item in the cart
  updateQuantity(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);  // Update item quantity via CartService
  }

  // Clear all items in the cart
  clearCart(): void {
    this.cartService.clearCart();  // Use CartService to clear the cart
  }

  // Proceed to checkout
  checkout(): void {
    alert('Proceeding to checkout with items worth $' + this.cartTotal.toFixed(2));
    // console.log('Checkout items:', this.cartItems); 3shan e7na m3fneen m3nash floss fe paypal ❌🤙
    this.OrderHistory.cartItems = this.cartItems;
    this.OrderHistory.orderCount++;
  }
}
