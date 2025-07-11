import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  errorMessage: string = '';
  successMessage: string = '';

  registerForm = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    confirmPassword: new FormControl(null, [Validators.required])
  }, { validators: this.checkConfirmPassword } // Custom validator for password confirmation

  );

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    console.log('RegisterComponent initialized');
  }

  onSubmit() {
    let user = {
      name: this.registerForm.get('name')?.value  || '',
      email: this.registerForm.get('email')?.value || '',
      password: this.registerForm.get('password')?.value || '',
      role: 'customer' // Default role, can be changed as needed
    };
    this.authService.register(user).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.registerForm.reset();
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration failed:', error);
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
      },
      complete: () => {
        console.log('Registration request completed');
      }
    })
    console.log('Registering user:', user);
  }

  // Custom validator to check if password and confirmPassword match
  checkConfirmPassword(pass: AbstractControl): { [key: string]: boolean } | null {
    const password = pass.get('password')?.value;
    const confirmPassword = pass.get('confirmPassword')?.value;
    if (password !== confirmPassword) {
      pass.get('confirmPassword')?.setErrors({ notMatching: true });
      return { notMatching: true };

    }
    return null;

  }
}
