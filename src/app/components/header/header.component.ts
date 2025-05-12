import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { WishlistService } from '../../../Services/wish-list.service';
import { CartService } from '../../../Services/cart.service';
import { AuthenticationService } from '../../../Services/authentication.service';  // Inject AuthService for login status
import { CommonModule } from '@angular/common';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName: string | null = null;  
  wishlistCount: number = 0;
  cartCount: number = 0;

  constructor(
    private router: Router,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private authService: AuthenticationService  // Inject AuthService for user login status
  ) {}

  ngOnInit(): void {

    combineLatest([
      this.cartService.getCartCount(),
      this.wishlistService.wishlistCount$
    ]).subscribe(([cartCount, wishlistCount]) => {
      this.cartCount = cartCount;
      this.wishlistCount = wishlistCount;
    });

    this.userName = this.authService.getCurrentUser();  
  }


  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
