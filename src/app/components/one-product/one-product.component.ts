import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { WishlistService } from '../../../Services/wish-list.service';
@Component({
  selector: 'app-one-product',
  imports: [CommonModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
  @Input() oneProductData:any
  constructor(private wishlistService: WishlistService) {}

  addToWishlist() {
    this.wishlistService.addToWishlist(this.oneProductData);
  }
}
