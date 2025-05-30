import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuthenticationService } from '../../../../Services/authentication.service';
import { ProductsService } from '../../../../Services/products.service';
import { OrderHistoryService } from '../../../../Services/order-history.service';


interface PopularProduct {
  title: string;
  salesCount: number;
}

interface ActivityItem {
  type: 'user' | 'order' | 'product';
  description: string;
  timeAgo: string;
}


@Component({
  selector: 'app-dashboard',
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  loading = true;

  users: any[] = [];
  totalUsers: number = 0;
  totalProducts: number = 0;
  totalSales: number = 0;
  totalOrders: number = 0;

  popularProducts: PopularProduct[] = [];
  recentActivities: ActivityItem[] = [];


  constructor(
    public auth: AuthenticationService,
    private productService: ProductsService,
    private OrderHistoryService: OrderHistoryService

  ) { }


  ngOnInit(): void {
    this.loadDashboardData();

    this.users = this.auth.getAllUsers();
    this.totalUsers = this.users.length;

    this.productService.getAllProducts().subscribe(products => {
      this.totalProducts = products.length;
    });

    const allOrders = this.OrderHistoryService.getAllOrdersForAdmin();
    this.totalOrders = allOrders.length;
    this.totalSales = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

    this.loadPopularProducts();
    this.loadRecentActivities();
  }


  loadDashboardData() {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }


  loadPopularProducts() {
    this.productService.getAllProducts().subscribe(products => {
      const allOrders = this.OrderHistoryService.getAllOrdersForAdmin();

      // Count sales by product id
      const salesCountByProductId = new Map<number, number>();

      allOrders.forEach(order => {
        order.items.forEach(item => {
          salesCountByProductId.set(
            item.id,
            (salesCountByProductId.get(item.id) || 0) + item.quantity
          );
        });
      });

      // Map products to sales counts and filter only products that have sales
      const popularProducts = products
        .map(p => ({
          title: p.title,
          salesCount: salesCountByProductId.get(p.id) || 0
        }))
        .filter(p => p.salesCount > 0)
        .sort((a, b) => b.salesCount - a.salesCount)  // Descending order by sales
        .slice(0, 5);  // top 5 popular products

      this.popularProducts = popularProducts;
    });
  }


  loadRecentActivities() {
    const activities: ActivityItem[] = [];

    // 1. Recent user registrations
    const users = this.auth.getAllUsers();
    const recentUsers = users.slice(-3).reverse(); // last 3 registered users

    recentUsers.forEach(user => {
      activities.push({
        type: 'user',
        description: `New user registered → ${user.profile?.firstName || user.email}`,
        timeAgo: this.getTimeAgo(user) // You can customize this (or just use static placeholder)
      });
    });

    // 2. Recent orders completed
    const allOrders = this.OrderHistoryService.getAllOrdersForAdmin();
    const recentOrders = allOrders
      .slice(0, 3);  // Just take the last 3 orders regardless of status


    recentOrders.forEach(order => {
      activities.push({
        type: 'order',
        description: `Order #${order.id} was completed`,
        timeAgo: this.getTimeAgo(order.date)
      });
    });

    // 3. Recent product updates - assuming localStorage keeps an 'updatedProducts' array
    const updatedProducts = JSON.parse(localStorage.getItem('updatedProducts') || '[]');
    const recentProductUpdates = updatedProducts.slice(-3).reverse();

    recentProductUpdates.forEach((prod: any) => {
      activities.push({
        type: 'product',
        description: `Product "${prod.title}" was updated`,
        timeAgo: this.getTimeAgo(prod.updatedAt)
      });
    });

    // Sort activities by most recent (you may want to parse date/time)
    // For demo, just keep order as-is or implement a better sorting if timestamps available
    this.recentActivities = activities.slice(0, 5);  // limit to 5 items
  }


  getTimeAgo(dateOrUser: any): string {
    // Basic example: returns a static string or calculates based on date
    // For demo, return static placeholder
    return '2 hours ago';
  }
}