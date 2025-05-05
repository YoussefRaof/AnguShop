import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../Services/cart.service';


@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartCount: number = 0;
  constructor(private cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });

  }
}
