import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private auth: ApiService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    // ⛔ 1. Check if user is logged in
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // 2. Get expected role from route
    const expectedRole = route.data['role'];

    // 3. Get user role from localStorage/JWT
    const userRole = this.auth.getRole();

    // ✔ 4. Check role match
    if (userRole === expectedRole) {
      return true; // allow route
    }

    // ❌ 5. Wrong role → redirect properly
    if (userRole === "ADMIN") {
      this.router.navigate(['/admin/dashboard']);
    } else if (userRole === "EXAMINER") {
      this.router.navigate(['/examiner/dashboard']);
    } else {
      this.router.navigate(['/login']);
    }

    return false;
  }
}
