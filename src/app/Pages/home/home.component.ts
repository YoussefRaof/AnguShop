import { Component, AfterViewInit, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tns } from 'tiny-slider/src/tiny-slider';
import { ProductsComponent } from "../products/products.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    // Preloader fadeout
    window.setTimeout(() => {
      const preloader = document.querySelector('.preloader') as HTMLElement;
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.display = 'none';
      }
    }, 500);

    // Tiny Slider: Hero
    tns({
      container: '.hero-slider',
      slideBy: 'page',
      autoplay: true,
      autoplayButtonOutput: false,
      mouseDrag: true,
      gutter: 0,
      items: 1,
      nav: false,
      controls: true,
      controlsText: [
        '<i class="fa-solid fa-chevron-left"></i>',
        '<i class="fa-solid fa-chevron-right"></i>'
      ]
    });

    // Tiny Slider: Brands Logo
    tns({
      container: '.brands-logo-carousel',
      autoplay: true,
      autoplayButtonOutput: false,
      mouseDrag: true,
      gutter: 15,
      nav: false,
      controls: false,
      responsive: {
        0: { items: 1 },
        540: { items: 3 },
        768: { items: 5 },
        992: { items: 6 }
      }
    });

    // Mobile menu toggle
    const navbarToggler = document.querySelector('.mobile-menu-btn');
    if (navbarToggler) {
      navbarToggler.addEventListener('click', () => {
        navbarToggler.classList.toggle('active');
      });
    }
  }


  scrollToTop() {
    const topElement = document.getElementById('top');
    if (topElement) {
      topElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
  




  // Scroll event: Sticky navbar + back-to-top button
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const headerNavbar = document.querySelector('.navbar-area') as HTMLElement;
    const backToTop = document.querySelector('.scroll-top') as HTMLElement;

    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      if (backToTop) backToTop.style.display = 'flex';
    } else {
      if (backToTop) backToTop.style.display = 'none';
    }
  }
}
