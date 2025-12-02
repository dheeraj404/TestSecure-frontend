import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, NgClass, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role: string = '';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';

  constructor(private apiservice: ApiService, private router: Router) {}

  chooseRole(r: string) {
    this.role = r;
    this.showError = false;
    this.errorMessage = '';
  }

  login() {
    this.showError = false;
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.showError = true;
      return;
    }

    this.isLoading = true;

    if (this.role === 'admin') {
      this.apiservice.loginAdmin(this.email, this.password).subscribe({
        next: (res) => {
          console.log('Admin logged in successfully', res);
          this.apiservice.saveAuthData(res.token, res.id, res.role);
          this.router.navigate(['/admin/dashboard']);
        },
        error: (error) => {
          console.error('Admin login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        }
      });
    } else if (this.role === 'examiner') {
      this.apiservice.loginExaminer(this.email, this.password).subscribe({
        next: (res) => {
          console.log('Examiner logged in successfully', res);
          this.apiservice.saveAuthData(res.token, res.id, res.role);
          this.router.navigate(['/examiner/dashboard']);
        },
        error: (error) => {
          console.error('Examiner login failed', error);
          this.errorMessage = 'Login failed. Please check your credentials.';
          this.isLoading = false;
        }
      });
    }
  }
}
