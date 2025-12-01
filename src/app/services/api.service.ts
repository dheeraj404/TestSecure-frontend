import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
 
})
export class ApiService {
 private RegisterUrl = env.apiBaseUrl + 'auth/admin/register';
 private OtpUrl = env.apiBaseUrl + 'auth/admin/verify-otp';
  constructor(private http:HttpClient) { }

  registerAdmin(data:any):Observable<any>{
    return this.http.post<any>(this.RegisterUrl, data);
  }
  verifyOtp(data:any):Observable<any>{
    return this.http.post<any>(this.OtpUrl, data);
  }

}
