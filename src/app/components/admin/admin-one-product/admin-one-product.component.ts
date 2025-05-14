import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass, SlicePipe } from '@angular/common';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../../Services/products.service';

@Component({
  selector: 'app-admin-one-product',
  standalone: true,
  imports: [CommonModule, NgClass, SlicePipe],
  templateUrl: './admin-one-product.component.html',
  styleUrls: ['./admin-one-product.component.css']
})
export class AdminOneProductComponent {
  @Input() product!: Product;

  constructor(private productService:ProductsService){

  }
  @Output() delete = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  get fullStars(): number {
    return Math.floor(this.product.rating?.rate || 0);
  }

  // onDelete(): void {
  //   this.delete.emit(this.product.id);
  // }
onDelete(): void {
  const localProducts = JSON.parse(localStorage.getItem('addedProducts') || '[]');

  // Check if the product exists in localStorage
  const index = localProducts.findIndex((p: any) => p.id === this.product.id);

  if (index !== -1) {
    // Product found in localStorage, delete it from there
    localProducts.splice(index, 1);
    localStorage.setItem('addedProducts', JSON.stringify(localProducts));
    // alert('Product deleted from local storage!');
    this.delete.emit(this.product.id);
  } else {
   
    this.delete.emit(this.product.id);
  }
}


  onView(): void {
    this.viewDetails.emit(this.product.id);
  }

  onEdit(): void {
    this.edit.emit(this.product.id);
  }
}
