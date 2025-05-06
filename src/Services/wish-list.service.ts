// wish-list.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlist: any[] = [];
  private wishlistCount = new BehaviorSubject<number>(0); // observable for header
  wishlistCount$ = this.wishlistCount.asObservable(); // exposed observable

  constructor() {
    const stored = localStorage.getItem('wishlist');
    this.wishlist = stored ? JSON.parse(stored) : [];
    this.wishlistCount.next(this.wishlist.length);
  }

  getWishlist(): any[] {
    return this.wishlist;
  }

  addToWishlist(product: any): void {
    const exists = this.wishlist.find((item) => item.id === product.id);
    if (!exists) {
      this.wishlist.push(product);
      this.updateStorage();
    }
  }

  removeFromWishlist(productId: number): void {
    this.wishlist = this.wishlist.filter(item => item.id !== productId);
    this.updateStorage();
  }

  private updateStorage() {
    localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
    this.wishlistCount.next(this.wishlist.length); // update count
  }
}
