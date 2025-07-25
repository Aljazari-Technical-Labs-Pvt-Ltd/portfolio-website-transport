import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';  // Import Routes
import { RouterModule } from '@angular/router'; // ✅ IMPORT THIS


import { MainPageComponent } from './main-page/main-page.component';
import { ServicesComponent } from './services/services.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BookingComponent } from './booking/booking.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent },
  { path: 'services', component: ServicesComponent},
  {path: 'about-us', component: AboutUsComponent},
  { path: 'booking', component: BookingComponent}
]
