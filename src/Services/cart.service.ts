import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  category?: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private cartCountSubject = new BehaviorSubject<number>(0);
  private cartTotalSubject = new BehaviorSubject<number>(0);

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser$.subscribe(email => {
      this.loadCartFromLocalStorage(email);
    });
  }

  getCartItems() {
    return this.cartSubject.asObservable();
  }

  getCartCount() {
    return this.cartCountSubject.asObservable();
  }

  getCartTotal() {
    return this.cartTotalSubject.asObservable();
  }

  addToCart(product: any) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += 1;
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        description: product.description
      };
      this.cartItems.push(newItem);
    }

    this.updateCart();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        this.cartItems[itemIndex].quantity = quantity;
        this.updateCart();
      }
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      localStorage.setItem(currentUser + '-cart', JSON.stringify(this.cartItems));
    }

    this.cartSubject.next([...this.cartItems]);

    const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCountSubject.next(totalItems);

    const totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.cartTotalSubject.next(totalPrice);
  }

  private loadCartFromLocalStorage(email: string | null) {
    if (email) {
      const storedCart = localStorage.getItem(email + '-cart');
      if (storedCart) {
        this.cartItems = JSON.parse(storedCart);
        this.updateCart();
      }
    } else {
      this.cartItems = [];
      this.updateCart();
    }
  }
}
