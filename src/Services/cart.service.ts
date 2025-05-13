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
  private cartCountSubject = new BehaviorSubject<number>(0); // Now represents unique items
  private cartTotalSubject = new BehaviorSubject<number>(0);
  private cartTotalQuantitySubject = new BehaviorSubject<number>(0); // New subject for total quantity

  constructor(private authService: AuthenticationService) {
    this.authService.currentUser$.subscribe(email => {
      this.loadCartFromLocalStorage(email);
    });
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  // Returns count of unique products
  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }

  // Returns total quantity of all items
  getCartTotalQuantity(): Observable<number> {
    return this.cartTotalQuantitySubject.asObservable();
  }

  getCartTotal(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }

  addToCart(product: any): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    const existingItemIndex = this.cartItems.findIndex(item => item.id === product.id);

    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += product.quantity || 1;
    } else {
      const newItem: CartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: product.quantity || 1,
        category: product.category,
        description: product.description
      };
      this.cartItems.push(newItem);
    }

    this.updateCart();
  }

  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== productId);
    this.updateCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const itemIndex = this.cartItems.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].quantity = Math.max(1, quantity);
      this.updateCart();
    }
  }

  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      localStorage.setItem(`${currentUser}-cart`, JSON.stringify(this.cartItems));
    }

    this.cartSubject.next([...this.cartItems]);
    this.updateCartMetrics();
  }

  private updateCartMetrics(): void {
    // Count of unique products (what you want as cart count)
    const uniqueItemsCount = this.cartItems.length;
    this.cartCountSubject.next(uniqueItemsCount);

    // Total quantity of all items (sum of quantities)
    const totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartTotalQuantitySubject.next(totalQuantity);

    // Total price
    const totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    this.cartTotalSubject.next(totalPrice);
  }

  private loadCartFromLocalStorage(email: string | null): void {
    if (email) {
      const storedCart = localStorage.getItem(`${email}-cart`);
      this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    } else {
      this.cartItems = [];
    }
    this.updateCart();
  }
}