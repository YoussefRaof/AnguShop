import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FormsModule, RouterModule, CommonModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  isSidebarCollapsed = false;
  activeTab: string = 'dashboard';


  constructor(private router: Router) {
    // Subscribe to route changes to update active tab
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        const urlSegments = event.url.split('/');
        this.activeTab = urlSegments[urlSegments.length - 1] || 'dashboard';
      });
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.router.navigate(['/admin', tab]);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  getHeaderIcon(): string {
    switch (this.activeTab) {
      case 'dashboard': return 'fas fa-tachometer-alt';
      case 'users': return 'fas fa-users';
      case 'products': return 'fas fa-boxes';
      case 'orders': return 'fas fa-shopping-cart';
      case 'settings': return 'fa-solid fa-gear';
      default: return 'fas fa-circle';
    }
  }

  // isActive(path: string): boolean {
  //   return this.router.url.includes(path);
  // }

  logout(): void {
    // any logic to clear session
    this.router.navigate(['/login']);
  }
}
