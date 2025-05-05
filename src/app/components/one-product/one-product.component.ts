import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-one-product',
  imports: [CommonModule],
  templateUrl: './one-product.component.html',
  styleUrl: './one-product.component.css'
})
export class OneProductComponent {
  @Input() oneProductData:any
  @Output() productAdded = new EventEmitter<void>();
  cartCount:number=0;
  constructor(private cartService: CartService) { }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.productAdded.emit();
    this.cartService.getCartCount().subscribe(count => {
      this.cartCount = count;
    });

  }
}
