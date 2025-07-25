// main-page.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('backgroundVideo') backgroundVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('servicesRow') servicesRow!: ElementRef<HTMLDivElement>;
  @ViewChild('offerList') offerList!: ElementRef<HTMLDivElement>;
  @ViewChild('offerItem1') offerItem1!: ElementRef<HTMLDivElement>;
  @ViewChild('offerItem2') offerItem2!: ElementRef<HTMLDivElement>;
  @ViewChild('offerItem3') offerItem3!: ElementRef<HTMLDivElement>;
  @ViewChild('offerItem4') offerItem4!: ElementRef<HTMLDivElement>;
  @ViewChild('offerItem5') offerItem5!: ElementRef<HTMLDivElement>;
  @ViewChild('offerItem6') offerItem6!: ElementRef<HTMLDivElement>;
  @ViewChild('testimonialsGrid') testimonialsGrid!: ElementRef<HTMLDivElement>;
  @ViewChild('testimonial1') testimonial1!: ElementRef<HTMLDivElement>;
  @ViewChild('testimonial2') testimonial2!: ElementRef<HTMLDivElement>;
  @ViewChild('testimonial3') testimonial3!: ElementRef<HTMLDivElement>;
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;
  
  private observer!: IntersectionObserver;
  private scrollThreshold = 50; // Adjust this value as needed
  
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}
  
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    if (this.header?.nativeElement) {
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollPosition > this.scrollThreshold) {
        this.header.nativeElement.classList.add('sticky');
      } else {
        this.header.nativeElement.classList.remove('sticky');
      }
    }
  }
  
  ngAfterViewInit() {
  if (isPlatformBrowser(this.platformId)) {
    // Safe to use DOM
    const video = this.backgroundVideo?.nativeElement;

    if (video && typeof video.play === 'function') {
      video.muted = true;
      video.play().catch((error) => {
        console.error('Video play error:', error);
      });
    } else {
      console.warn('backgroundVideo is not a valid video element');
    }

    this.initScrollAnimations();
  }
  }
  
  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  private initScrollAnimations() {
    // Create intersection observer for scroll animations
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    // Observe services row
    if (this.servicesRow?.nativeElement) {
      this.observer.observe(this.servicesRow.nativeElement);
    }
    
    // Observe offer items
    const offerItems = [
      this.offerItem1,
      this.offerItem2,
      this.offerItem3,
      this.offerItem4,
      this.offerItem5,
      this.offerItem6
    ];
    
    offerItems.forEach(item => {
      if (item?.nativeElement) {
        this.observer.observe(item.nativeElement);
      }
    });
    
    // Observe testimonials grid
    if (this.testimonialsGrid?.nativeElement) {
      this.observer.observe(this.testimonialsGrid.nativeElement);
    }
    
    // Observe individual testimonials for staggered animation
    const testimonials = [
      this.testimonial1,
      this.testimonial2,
      this.testimonial3
    ];
    
    testimonials.forEach((testimonial, index) => {
      if (testimonial?.nativeElement) {
        // Add delay for staggered effect
        setTimeout(() => {
          if (testimonial?.nativeElement) {
            this.observer.observe(testimonial.nativeElement);
          }
        }, index * 100);
      }
    });
  }
  
  navigateToSolution() {
    this.router.navigate(['academics']);
  }
  
  // Additional methods for enhanced functionality
  navigateToServices() {
    this.router.navigate(['/services']);
  }
  
  navigateToBooking() {
    this.router.navigate(['/booking']);
  }
  
  navigateToAbout() {
    this.router.navigate(['/about-us']);
  }
  
  // Method to handle smooth scrolling to sections
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
}