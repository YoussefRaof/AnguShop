import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishlistService } from '../../../Services/wish-list.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  wishlistCount: number = 0;

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {
    // الاشتراك في observable لتحديث العدد عند التغيير
    this.wishlistService.wishlistCount$.subscribe(count => {
      this.wishlistCount = count;
    });
  }
}

