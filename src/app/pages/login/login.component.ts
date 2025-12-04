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

  showPassword: boolean = false;

togglePassword() {
  this.showPassword = !this.showPassword;
}

login() {
  this.showError = false;
  this.errorMessage = '';

  if (!this.email || !this.password) {
    this.showError = true;
    this.errorMessage = 'Email and password are required.';
    return;
  }

  this.isLoading = true;

  if (this.role === 'admin') {
    this.apiservice.loginAdmin(this.email, this.password).subscribe({
      next: (res) => {
        this.apiservice.saveAuthData(res.token, res.id, res.role);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || "Invalid credentials";
        this.showError = true;
      }
    });
  }

  if (this.role === 'examiner') {
    this.apiservice.loginExaminer(this.email, this.password).subscribe({
      next: (res) => {
        this.apiservice.saveAuthData(res.token, res.id, res.role);
        this.apiservice.Saveusername(res.name);
        this.router.navigate(['/examiner/dashboard']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error.error?.error || "Invalid credentials";
        this.showError = true;
      }
    });
  }}
}
