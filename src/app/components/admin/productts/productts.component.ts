import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AdminOneProductComponent } from "../admin-one-product/admin-one-product.component";


@Component({
  selector: 'app-productts',
  imports: [
    FormsModule, RouterModule, CommonModule,
    AdminOneProductComponent
],
  templateUrl: './productts.component.html',
  styleUrl: './productts.component.css'
})
export class ProducttsComponent {

}
