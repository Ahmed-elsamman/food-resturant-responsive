import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLoginData, UserLoginResponse } from '../models/user-login';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegisterData, UserRegisterResponse } from '../models/user-register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.apiUrl; // Replace with your actual API URL

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject;
  constructor(private HttpClient:HttpClient) { }

  login(userData:UserLoginData): Observable<UserLoginResponse>{
    this.isAuthenticatedSubject.next(true); // Set authenticated state to true after login
    return this.HttpClient.post<UserLoginResponse>(`${this.API_URL}/users/login`,userData)    
    
  }

  register(userData:UserRegisterData): Observable<UserRegisterResponse>{
    return this.HttpClient.post<UserRegisterResponse>(`${this.API_URL}/users/register`,userData)    
  }


  logout(): void {
    this.isAuthenticatedSubject.next(false); // Set authenticated state to true after login
    localStorage.removeItem('token'); // Assuming you store the token in localStorage
  }




}
