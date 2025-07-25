// services.component.ts
import { Component, HostListener, ViewChild, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.onScroll();
      }, 100);
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.isBrowser) return;

    const elements = document.querySelectorAll('.scroll-reveal');
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('visible');
      }
    });

    if (this.header) {
      const scrolled = window.pageYOffset;
      const headerElement = this.header.nativeElement;

      headerElement.style.backgroundColor = scrolled > 50
        ? 'rgba(0, 0, 0, 0.98)'
        : 'rgba(0, 0, 0, 0.95)';
    }
  }
}
