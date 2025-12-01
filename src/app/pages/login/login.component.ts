import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  role: string = '';
  email: string = '';
  password: string = '';

  chooseRole(r: string) {
    this.role = r;
  }

  login() {
    console.log("Login:", this.role, this.email, this.password);
  }
}
