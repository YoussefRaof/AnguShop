import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  Prdid:any
  UserDetailsData:any
  constructor(MyActivated:ActivatedRoute , private _productService:ProductsService){
    this.Prdid=MyActivated.snapshot.params["id"]
    // console.log(this.Prdid)
    
  }
  ngOnInit(): void {
    this._productService.getProductById(this.Prdid).subscribe({
      next: (data)=>{this.UserDetailsData = data},
      error: (error)=>console.log(error)
    })
  }

  getStars(rate: number): string[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rate >= i) {
        stars.push('full');
      } else if (rate >= i - 0.5) {
        stars.push('half');
      } else {
        stars.push('empty');
      }
    }
    return stars;
  }
}
