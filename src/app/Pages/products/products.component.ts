import { Component, OnInit } from '@angular/core';
import { OneProductComponent } from "../../components/one-product/one-product.component";
import { ProductsService } from '../../../Services/products.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [OneProductComponent,FormsModule,CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  currentPage:number = 1;
  pageSize:number=8;
  AllProducts: any[]=[]
  searchText: string = '';
  showAlert: boolean = false;

  constructor(private _prodService:ProductsService){}
  loading: boolean = true;

  ngOnInit(): void {
    this._prodService.getAllProducts().subscribe({
      next:(data) => {this.AllProducts=data as any[];
        this.loading=false
      },
      error: (error) => {console.log(error);
        this.loading=false
      }
    })
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts().length / this.pageSize); 
}
  
  paginatedProducts(): any[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize); 
  }
  
changePage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
    // Scroll to top of product list
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional smooth scroll
    });
  }
}
  
  filteredProducts(): any[] {
    if (!this.searchText) return this.AllProducts;
    const lower = this.searchText.toLowerCase();
    return this.AllProducts.filter(product =>
      product.title?.toLowerCase().includes(lower)
    );
  }


  showNotification(): void {
    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 3000);
  }

}
