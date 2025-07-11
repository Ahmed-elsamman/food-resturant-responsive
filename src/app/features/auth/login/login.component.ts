import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  errorMessage: string = '';
  successMessage: string = '';




  loginForm:FormGroup= new FormGroup({
    email:new FormControl(null , [ Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.email]),
    password:new FormControl(null , [ Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    rememberMe:new FormControl(false)
  });

  constructor( private authService: AuthService ,private router:Router ,@Inject(PLATFORM_ID) private PlatformID:any) {}

  ngOnInit() {
    console.log('LoginComponent initialized',this.authService.isUserLogging());
    
    }


onSubmit(){
  this.authService.login(this.loginForm.value).subscribe({
    next: (response) => {
      if(isPlatformBrowser(this.PlatformID)) {

        localStorage.setItem('token', response.token);
        localStorage.setItem('currntUser', JSON.stringify(response.user));
      }
      this.successMessage = response.message;
      // this.authService.isAuthenticated(true); // Set authenticated state to true after login
      this.authService.isAuthenticatedSubject.next(true); // Set authenticated state to true after login
      this.loginForm.reset(); 
      this.router.navigate(['/home']); // Navigate to home after successful login
      console.log('LoginComponent initialized -- 2',this.authService.isUserLogging());

    },
    error: (error) => {
      console.error('Login failed:', error);
      this.errorMessage = error.error.message || 'Login failed. Please try again.';
      console.log('Error details:',this.errorMessage);
      
    },
    complete: () => {
      console.log('Login request completed');
    }
  }); 

}
  
}
