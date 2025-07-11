import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('NavbarComponent initialized');
    this.authService.isAuthenticatedSubject.subscribe((value) => {
      this.isAuthenticated = value;
      console.log('User authentication status from navbar:', this.isAuthenticated);
    });
  }

  logout() {
    this.authService.logout(); // Call the logout method from AuthService
    // No need to manually set isAuthenticated, subscription will update it
    console.log('User logged out from navbar');
  }
}
