import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WishlistService } from '../../../Services/wish-list.service';

import { CartService } from '../../../Services/cart.service';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName: string = 'Ahmed';
  wishlistCount: number = 0;
  cartCount: number = 0;
  constructor(private wishlistService: WishlistService , private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });



  }
)}}
