import { Component, OnInit } from '@angular/core';
import { OneProductComponent } from "../../components/one-product/one-product.component";
import { ProductsService } from '../../../Services/products.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [OneProductComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  AllProducts: any[]=[]
  searchText: string = '';
  constructor(private _prodService:ProductsService){}

  ngOnInit(): void {
    this._prodService.getAllProducts().subscribe({
      next:(data) => this.AllProducts=data as any[],
      error: (error) => console.log(error)
    })
  }

  filteredProducts(): any[] {
    if (!this.searchText) return this.AllProducts;
    let lower = this.searchText.toLowerCase();
    return this.AllProducts.filter(product =>
      product.title?.toLowerCase().includes(lower)
    );
  }
  
}
