import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgClass, SlicePipe } from '@angular/common';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-admin-one-product',
  standalone: true,
  imports: [CommonModule, NgClass, SlicePipe],
  templateUrl: './admin-one-product.component.html',
  styleUrls: ['./admin-one-product.component.css']
})
export class AdminOneProductComponent {
  @Input() product!: Product;

  @Output() delete = new EventEmitter<number>();
  @Output() viewDetails = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  get fullStars(): number {
    return Math.floor(this.product.rating?.rate || 0);
  }

  onDelete(): void {
    this.delete.emit(this.product.id);
  }

  onView(): void {
    this.viewDetails.emit(this.product.id);
  }

  onEdit(): void {
    this.edit.emit(this.product.id);
  }
}
