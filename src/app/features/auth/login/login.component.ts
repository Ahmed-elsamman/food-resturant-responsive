import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { log } from 'node:console';

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

  constructor( private authService: AuthService ,private router:Router) {}

  ngOnInit() {
    console.log('LoginComponent initialized',this.authService.isAuthenticated$.value);
    
    }


onSubmit(){
  this.authService.login(this.loginForm.value).subscribe({
    next: (response) => {
      localStorage.setItem('token', response.token);
      localStorage.setItem('currntUser', JSON.stringify(response.user));
      this.successMessage = response.message;
      this.loginForm.reset(); 
      this.router.navigate(['/slider']);
    console.log('LoginComponent initialized -- 2',this.authService.isAuthenticated$.value);

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
