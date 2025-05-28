import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';

export enum OrderStatus {
  OrderPlaced = "Order Placed",
  Shipped = "Shipped",
  OutForDelivery = "Out for Delivery",
  Delivered = "Delivered",
  Cancelled = "Cancelled"
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  totalAmount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private orders: Order[] = [];
  
  constructor() {
    // Load any existing orders from localStorage (optional)
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      this.orders = JSON.parse(savedOrders);
    }
  }

  // Add a new order from checkout items
  addOrder(checkoutItems: CartItem[]): Order {
    const newOrder: Order = {
      id: this.generateOrderId(),
      date: new Date().toLocaleDateString(),
      status: OrderStatus.OrderPlaced,
      items: [...checkoutItems], // Create a copy of the items
      totalAmount: this.calculateTotal(checkoutItems)
    };
    
    this.orders.unshift(newOrder); // Add new order at beginning
    this.saveToLocalStorage(); // Persist to localStorage
    return newOrder;
  }

  // Get all orders (sorted by newest first)
  getOrders(): Order[] {
    return [...this.orders];
  }

  // Get a specific order by ID
  getOrder(orderId: string): Order | undefined {
    return this.orders.find(order => order.id === orderId);
  }

  // Update order status
  updateOrderStatus(orderId: string, newStatus: OrderStatus): boolean {
    const order = this.getOrder(orderId);
    if (order) {
      order.status = newStatus;
      this.saveToLocalStorage();
      return true;
    }
    return false;
  }

  // Cancel an order
  cancelOrder(orderId: string): boolean {
    return this.updateOrderStatus(orderId, OrderStatus.Cancelled);
  }

  // Helper to generate unique order IDs
  private generateOrderId(): string {
    return `EGP-${Date.now().toString().slice(-6)}`;
  }

  // Helper to calculate order total
  private calculateTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  // Persist orders to localStorage
  private saveToLocalStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders));
  }
}