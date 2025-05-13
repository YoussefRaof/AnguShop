import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../Services/wish-list.service';
import { OneProductComponent } from "../../components/one-product/one-product.component";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-wish-list',
  standalone: true, // هذا مطلوب إذا تستخدم Standalone Components
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css'],
  imports: [OneProductComponent, CommonModule,RouterModule]
})
export class WishListComponent implements OnInit {
  wishlistItems: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    this.loadWishlist();
  }

  loadWishlist(): void {
    this.wishlistItems = this.wishlistService.getWishlist();
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
    this.loadWishlist(); // إعادة تحميل القائمة بعد الحذف
  }
}
