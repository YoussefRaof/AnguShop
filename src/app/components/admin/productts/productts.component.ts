import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Product } from '../../../interfaces/product';
import { ProductsService } from '../../../../Services/products.service';
import { AdminOneProductComponent } from '../admin-one-product/admin-one-product.component';


// @Component({
//   selector: 'app-productts',
//   standalone: true,
//   imports: [
//     FormsModule,
//     RouterModule,
//     CommonModule,
//     AdminOneProductComponent
//   ],
//   templateUrl: './productts.component.html',
//   styleUrls: ['./productts.component.css'] // ✅ 'styleUrls' not 'styleUrl'
// })
// export class ProducttsComponent implements OnInit {
//   products: Product[] = [];
//   loading:boolean = true;
//   searchText: string = '';
// currentPage: number = 1;
// pageSize: number = 6;


// get filteredProducts(): Product[] {
//   return this.products.filter(p =>
//     p.title.toLowerCase().includes(this.searchText.toLowerCase())
//   );
// }

// get paginatedProducts(): Product[] {
//   const start = (this.currentPage - 1) * this.pageSize;
//   return this.filteredProducts.slice(start, start + this.pageSize);
// }

// get totalPages(): number {
//   return Math.ceil(this.filteredProducts.length / this.pageSize);
// }

//   constructor(private productService: ProductsService) { }

//   ngOnInit(): void {
//     this.productService.getAllProducts().subscribe({
//       next: data => {this.products = data
//         this.loading = false},
//       error: err => {console.error('Failed to fetch products', err)
//         this.loading = false;
//       }
//     });
//   }

//   onDeleteProduct(id: number): void {
//     if (confirm('Are you sure you want to delete this product?')) {
//       this.productService.deleteProduct(id).subscribe({
//         next: (res) => {
//           console.log('Deleted:', res);
//           this.products = this.products.filter(p => p.id !== id);
//         },
//         error: (err) => {
//           console.error('Failed to delete product', err);
//         }
//       });
//     }
//   }


//   onViewProduct(id: number): void {
//     console.log('View product details:', id);
//     // Navigate to a product detail page or show modal
//   }

//   onEditProduct(id: number): void {
//     console.log('Edit product:', id);
//     // Show modal or enable inline editing
//   }
//   handleDelete(productId: number) {
//     // Handle product deletion
//   }

//   handleUpdate(updatedProduct: Product) {
//     // Handle product updates
//   }
// }

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
  styleUrls: ['./productts.component.css']
})
export class ProducttsComponent implements OnInit {
  products: Product[] = [];
  loading = true;
  searchText = '';
  currentPage = 1;
  pageSize = 6;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: data => {
        this.products = data;
        this.loading = false;
      },
      error: err => {
        console.error('Failed to fetch products', err);
        this.loading = false;
      }
    });
  }

 get filteredProducts(): Product[] {
  return this.products.filter(p =>
    p.title.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

get paginatedProducts(): Product[] {
  const start = (this.currentPage - 1) * this.pageSize;
  return this.filteredProducts.slice(start, start + this.pageSize);
}

get totalPages(): number {
  return Math.ceil(this.filteredProducts.length / this.pageSize);
}

changePage(page: number): void {
  if (page > 0 && page <= this.totalPages) {
    this.currentPage = page;
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional smooth scroll
    });
  }
    
}
  onDeleteProduct(id: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.products = this.products.filter(p => p.id !== id);
        },
        error: err => {
          console.error('Failed to delete product', err);
        }
      });
    }
  }

  onViewProduct(id: number): void {
    console.log('View product details:', id);
  }

  onEditProduct(id: number): void {
    console.log('Edit product:', id);
  }

  // Reserved for future use with child events
  handleDelete(productId: number) {}
  handleUpdate(updatedProduct: Product) {}
}
