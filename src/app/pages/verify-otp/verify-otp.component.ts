import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent {

  otp = '';
  email = '';
  loading = false;
  errorMsg = '';

  constructor(private apiService: ApiService, private router: Router) {
    const state = history.state;
    this.email = state['email'];
  }

  verifyOTP() {
    if (!this.otp || this.otp.length < 4) {
      this.errorMsg = "Please enter a valid OTP";
      return;
    }

    this.loading = true;
    this.errorMsg = '';

    const data = {
      email: this.email,
      otp: this.otp
    };

    this.apiService.verifyOtp(data).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMsg = "Invalid OTP. Please try again.";
        console.error('OTP verification failed', error);
      }
    });
  }
}
