// about-us.component.ts
import { Component, HostListener, ViewChild, ElementRef, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;

  ngOnInit(): void {
    // Trigger initial animation check after component loads
    setTimeout(() => {
      this.onScroll();
    }, 100);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    // Handle scroll reveal animations
    const elements = document.querySelectorAll('.scroll-reveal');
    const windowHeight = window.innerHeight;

    elements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 100;

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add('visible');
      }
    });

    // Handle staggered animations for team members
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
      const memberTop = member.getBoundingClientRect().top;
      const memberVisible = 150;

      if (memberTop < windowHeight - memberVisible) {
        setTimeout(() => {
          member.classList.add('visible');
        }, index * 200); // Stagger animation by 200ms for each member
      }
    });

    // Handle timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
      const itemTop = item.getBoundingClientRect().top;
      const itemVisible = 100;

      if (itemTop < windowHeight - itemVisible) {
        setTimeout(() => {
          item.classList.add('visible');
        }, index * 300); // Stagger timeline items
      }
    });

    // Optional: Add header effects based on scroll position
    if (this.header) {
      const scrolled = window.pageYOffset;
      const headerElement = this.header.nativeElement;
      
      if (scrolled > 50) {
        headerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.98)';
      } else {
        headerElement.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
      }
    }
  }
}