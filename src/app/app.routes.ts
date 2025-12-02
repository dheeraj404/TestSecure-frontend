import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterAdminComponent } from './pages/register-admin/register-admin.component';
import { VerifyOtpComponent } from './pages/verify-otp/verify-otp.component';
import { RoleGuard } from './ guards/role.guard';
import { AdminDashboardComponentComponent } from './pages/admin-dashboard-component/admin-dashboard-component.component'
import { ExaminerDashboardComponent } from './pages/examiner-dashboard/examiner-dashboard.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register-admin', component: RegisterAdminComponent },
    {path: 'verify-otp', component: VerifyOtpComponent},
    {
        path: "admin/dashboard",
        component: AdminDashboardComponentComponent,
        canActivate: [RoleGuard],
        data: { role: "ADMIN" }
      },
    
      // EXAMINER Routes (protected)
      {
        path: "examiner/dashboard",
        component: ExaminerDashboardComponent,
        canActivate: [RoleGuard],
        data: { role: "EXAMINER" }
      }

  ];
