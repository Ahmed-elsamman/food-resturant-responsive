import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { UserLoginData, UserLoginResponse } from '../models/user-login';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserRegisterData, UserRegisterResponse } from '../models/user-register';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  API_URL = environment.apiUrl; // Replace with your actual API URL

  ;
  isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private HttpClient: HttpClient, @Inject(PLATFORM_ID) private PlatformID: any) {
    if (isPlatformBrowser(this.PlatformID)) {
      this.isAuthenticatedSubject = new BehaviorSubject<boolean>(localStorage.getItem('token') ? true : false);

    }
  }

  login(userData: UserLoginData): Observable<UserLoginResponse> {
    return this.HttpClient.post<UserLoginResponse>(`${this.API_URL}/users/login`, userData)

  }

  register(userData: UserRegisterData): Observable<UserRegisterResponse> {
    return this.HttpClient.post<UserRegisterResponse>(`${this.API_URL}/users/register`, userData)
  }


  logout(): void {
    this.isAuthenticatedSubject.next(false); // Set authenticated state to true after login
    localStorage.removeItem('token'); // Assuming you store the token in localStorage
    localStorage.removeItem('currntUser'); // Assuming you store the current user in localStorage
  }

  isAuthenticated(value: boolean): void {
    this.isAuthenticatedSubject.next(value); // Set authenticated state to true after login
  }
  isUserLogging(): boolean {

    return this.isAuthenticatedSubject.value; // Return the current authentication status
  }



}
