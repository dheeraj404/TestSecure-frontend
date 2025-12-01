import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, HttpClientModule],
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  registerForm!: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiservice: ApiService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        universityName: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  passwordMatchValidator(group: AbstractControl) {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { passwordMismatch: true };
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const { universityName, email, password } = this.registerForm.value;

    const data = { universityName, email, password };

    this.apiservice.registerAdmin(data).subscribe({
      next: (response) => {
        this.loading = false;
        this.router.navigate(['/verify-otp'], {
          state: { email }
        });
      },
      error: (error) => {
        this.loading = false;
        console.error("Registration failed", error);
      }
    });
  }
}
