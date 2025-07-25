// booking.component.ts
import { Component, HostListener, ViewChild, ElementRef, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, RouterModule, NavbarComponent],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  @ViewChild('header', { read: ElementRef }) header!: ElementRef;

  booking = {
    name: '',
    gender: '',
    age: null,
    specialSeat: false,
    idCard: ''
  };

  ngOnInit(): void {
    // Trigger initial animation check after component loads
    setTimeout(() => {
      this.onScroll();
    }, 100);

    // Stagger animations for form elements
    setTimeout(() => {
      this.staggerAnimations();
    }, 500);
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

    // Header effects based on scroll position
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

  private staggerAnimations(): void {
    const inputGroups = document.querySelectorAll('.input-group');
    const specialSeat = document.querySelector('.special-seat-section');
    const formActions = document.querySelector('.form-actions');
    const bookingInfo = document.querySelector('.booking-info');

    // Animate input groups with stagger
    inputGroups.forEach((group, index) => {
      setTimeout(() => {
        group.classList.add('visible');
      }, index * 200);
    });

    // Animate other sections
    setTimeout(() => {
      specialSeat?.classList.add('visible');
    }, inputGroups.length * 200 + 200);

    setTimeout(() => {
      formActions?.classList.add('visible');
    }, inputGroups.length * 200 + 400);

    setTimeout(() => {
      bookingInfo?.classList.add('visible');
    }, inputGroups.length * 200 + 600);
  }

  submitForm(): void {
    if (this.isFormValid()) {
      // Create booking summary
      const bookingSummary = {
        ...this.booking,
        bookingId: this.generateBookingId(),
        timestamp: new Date(),
        status: 'confirmed'
      };

      console.log('Booking submitted:', bookingSummary);
      
      // Show success message with booking details
      this.showSuccessMessage(bookingSummary);
      
      // Reset form after successful submission
      setTimeout(() => {
        this.resetForm();
      }, 3000);
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.booking.name &&
      this.booking.gender &&
      this.booking.age &&
      this.booking.idCard &&
      this.booking.idCard.match(/^[0-9]{13}$/)
    );
  }

  private generateBookingId(): string {
    const prefix = 'LXT';
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  }

  private showSuccessMessage(booking: any): void {
    const message = `
🎉 Booking Confirmed Successfully!

📋 Booking Details:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🆔 Booking ID: ${booking.bookingId}
👤 Name: ${booking.name}
⚧ Gender: ${booking.gender}
🎂 Age: ${booking.age}
${booking.specialSeat ? '♿ Special Seat: Required' : ''}
📱 ID: ${booking.idCard}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 Confirmation details sent to your email
📱 SMS notification will arrive shortly
🚌 Thank you for choosing Lynx Transit!

Safe travels! 🛣️✨
    `;
    
    alert(message);
  }

  private resetForm(): void {
    this.booking = {
      name: '',
      gender: '',
      age: null,
      specialSeat: false,
      idCard: ''
    };
    
    // Re-trigger animations
    const elements = document.querySelectorAll('.input-group, .special-seat-section, .form-actions, .booking-info');
    elements.forEach(el => {
      el.classList.remove('visible');
    });
    
    setTimeout(() => {
      this.staggerAnimations();
    }, 100);
  }
}