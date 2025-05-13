import { Component, Input } from '@angular/core';

import { Product } from '../interfaces/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import { ConfirmDeleteModalComponent } from '../confirm-delete-modal/confirm-delete-modal.component';
import { ProductsService } from '../../../../Services/products.service';

@Component({
  selector: 'app-admin-one-product',
  templateUrl: './admin-one-product.component.html',
  styleUrls: ['./admin-one-product.component.css']
})
export class AdminOneProductComponent {
  @Input() product!: Product;

  constructor(
    private productsService: ProductsService,
    private modalService: NgbModal
  ) {}

  openViewModal() {
    const modalRef = this.modalService.open(EditProductModalComponent, { 
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.product = { ...this.product };
    modalRef.componentInstance.mode = 'view';
  }

  openEditModal() {
    const modalRef = this.modalService.open(EditProductModalComponent, {
      centered: true,
      size: 'lg'
    });
    modalRef.componentInstance.product = { ...this.product };
    modalRef.componentInstance.mode = 'edit';
    
    modalRef.result.then((updatedProduct) => {
      if (updatedProduct) {
        this.product = updatedProduct;
      }
    });
  }

  openDeleteConfirm() {
    const modalRef = this.modalService.open(ConfirmDeleteModalComponent, {
      centered: true
    });
    modalRef.componentInstance.productName = this.product.title;
    
    modalRef.result.then((result) => {
      if (result === 'delete') {
        this.productsService.deleteProduct(this.product.id).subscribe(() => {
          // Handle deletion (parent component should remove this product from list)
        });
      }
    });
  }
}