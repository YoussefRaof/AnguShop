import { Component } from '@angular/core';
import { OrderHistoryService } from '../../../Services/order-history.service';
import { CartItem } from '../../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {
  public CartItems: CartItem[] = [];
  public OrderCount: number = 0;
  public dummyArray = Array(this.OrderCount).fill(0);
  public date: string = new Date().toLocaleDateString();
  public status: Status = Status.OrderPlaced; // Default: Order Placed (no auto-progression)
  public TotalAmount: number = 0;
  public Status = Status;

  constructor(private OrderHistory: OrderHistoryService) {
    this.CartItems = OrderHistory.cartItems;
    this.OrderCount = OrderHistory.orderCount;
    this.dummyArray = Array(this.OrderCount).fill(0);
    this.TotalAmount = this.CartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  cancelOrder() {
    this.status = Status.Cancelled; // Set to "Cancelled" (red badge)
  }

  // Only allow cancel if still in "Order Placed" state
  canCancelOrder(): boolean {
    return this.status === Status.OrderPlaced;
  }
}

enum Status {
  OrderPlaced = "Order Placed",
  Shipped = "Shipped",
  OutForDelivery = "Out for Delivery",
  Delivered = "Delivered",
  Cancelled = "Cancelled"
}