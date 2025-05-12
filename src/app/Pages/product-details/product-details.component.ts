import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Services/products.service';
import { WishlistService } from '../../../Services/wish-list.service';
import { CartService } from '../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  Prdid:any
  UserDetailsData:any
  quantity:number =1
  addedToCart: boolean = false
  addedToWish: boolean = false


  constructor(private wishlistService: WishlistService,MyActivated:ActivatedRoute , private _productService:ProductsService, private _cartService:CartService){
    this.Prdid=MyActivated.snapshot.params["id"]
    // console.log(this.Prdid)

  }
  ngOnInit(): void {
    this._productService.getProductById(this.Prdid).subscribe({
      next: (data)=>{this.UserDetailsData = data},
      error: (error)=>console.log(error)
    })
  }
  addToWishlist() {
    this.wishlistService.addToWishlist(this.UserDetailsData);
    this.addedToWish = true;

  }
  addToCart(){
  const productToAdd ={
    ...this.UserDetailsData,
    quantity : this.quantity
  }

  this._cartService.addToCart(productToAdd);
  this.addedToCart = true;
  console.log(this.addedToCart)

  setTimeout(() => {
    this.addedToCart = false;
  }, 2000);
  console.log(this.addedToCart)

}
updateQuantity(value: number) {
  this.quantity = value;
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
