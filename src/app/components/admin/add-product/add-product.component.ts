import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../../Services/products.service';
import { CategoriesService } from '../../../../Services/categories.service';
import { Product } from '../../../interfaces/product';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponen implements OnInit {

  
  productForm: FormGroup;
  categories: any[] = []; // Use string[] if categories are simple strings
 ngOnInit(): void {
    this.fetchCategories(); // Fetch categories when component initializes
    
  }
  constructor(
    private fb: FormBuilder,
    private productService: ProductsService,
    private categoryService:CategoriesService,
    private router: Router
  ) {

    this.productForm = this.fb.group({
     
      title: ['', Validators.required],
      price: [0.1, [Validators.required, Validators.min(0.01)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      image: ['http://example.com', Validators.required]
    });
  }
   
  fetchCategories(): void {
    this.categoryService.GetAllCategoriesName().subscribe({
      next: (cats) => {
        this.categories = cats;
        console.log(this.categories); 
      },
      error: (err) => console.error('Failed to fetch categories:', err)
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.addNewProduct(this.productForm.value).subscribe({
          next: (res) => {
        console.log("Product added:", res); 
        this.router.navigate(['/admin/products']);
      },
        error: err => console.error('Failed to add product:', err)
      });
    }
  }
}
