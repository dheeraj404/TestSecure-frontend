import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
 
})
export class ApiService {
 private RegisterUrl = env.apiBaseUrl + 'auth/admin/register';
 private OtpUrl = env.apiBaseUrl + 'auth/admin/verify-otp';
 private baseUrl = env.apiBaseUrl ;
  constructor(private http:HttpClient,private router:Router) { }

  registerAdmin(data:any):Observable<any>{
    return this.http.post<any>(this.RegisterUrl, data);
  }
  verifyOtp(data:any):Observable<any>{
    return this.http.post<any>(this.OtpUrl, data);
  }
  loginAdmin(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}auth/admin/login`, { email, password });
  }

  loginExaminer(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}auth/examiner/login`, { email, password });
  }
  CreateExaminer(data:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}admin/examiner/create`, data);
  }
  ExaminerList():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}admin/examiner`);
  }
  uploadPaper(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}admin/upload-paper`, formData);
  }
  getPapersForExaminer():Observable<any>{
    return this.http.get<any>(`${this.baseUrl}examiner/papers`);
  }
  downloadPaper(paperId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}examiner/download-paper/${paperId}`, { responseType: 'blob' });
  }
  saveAuthData(token: string, id: number, role: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("id", id.toString());
  }
  Saveusername(username: string) {
    localStorage.setItem("username", username);
  }
    getUsername() {
    return localStorage.getItem("username");
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRole() {
    return localStorage.getItem("role");
  }

  getId() {
    return localStorage.getItem("id");
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }

}
