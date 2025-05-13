import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../../Services/products.service';
import { AdminOneProductComponent } from '../admin-one-product/admin-one-product.component';

@Component({
  selector: 'app-productts',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    CommonModule,
    AdminOneProductComponent
  ],
  templateUrl: './productts.component.html',
  styleUrls: ['./productts.component.css'] // ✅ 'styleUrls' not 'styleUrl'
})
export class ProducttsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: data => this.products = data,
      error: err => console.error('Failed to fetch products', err)
    });
  }

  onDeleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: (res) => {
          console.log('Deleted:', res);
          this.products = this.products.filter(p => p.id !== id);
        },
        error: (err) => {
          console.error('Failed to delete product', err);
        }
      });
    }
  }


  onViewProduct(id: number): void {
    console.log('View product details:', id);
    // Navigate to a product detail page or show modal
  }

  onEditProduct(id: number): void {
    console.log('Edit product:', id);
    // Show modal or enable inline editing
  }
  handleDelete(productId: number) {
    // Handle product deletion
  }

  handleUpdate(updatedProduct: Product) {
    // Handle product updates
  }
}
