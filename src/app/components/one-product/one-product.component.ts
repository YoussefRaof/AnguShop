import { CommonModule } from '@angular/common';

import { WishlistService } from '../../../Services/wish-list.service';

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-one-product',
  imports: [CommonModule, RouterModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
  @Input() oneProductData: any

  constructor(private wishlistService: WishlistService, private cartService: CartService) { }

  addToWishlist() {
    this.wishlistService.addToWishlist(this.oneProductData);
  }


  getStars(rate: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push('full');
      } else if (rate >= i - 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }


  @Output() productAdded = new EventEmitter<void>();
  cartCount: number = 0;
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.productAdded.emit();
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });
  }

}
