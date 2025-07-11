import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export interface ErrorInfo {
  message: string;
  subMessage: string;
  errorImg: string;
}

@Component({
  selector: 'app-server-error',
  standalone: true,
  templateUrl: './server-error.component.html',
  styleUrl: './server-error.component.scss'
})


export class ServerErrorComponent {
  errorStatus!: number;
  errors: { [key: number]: ErrorInfo } = {
    500: {
      message: 'Internal Server Error',
      subMessage: 'There was a problem with the server. Please try again later. or  Please return to the home page.',
      errorImg: 'assets/images/errors/error-500.jpg',
    },
    404: {
      message: 'Page Not Found',
      subMessage: 'The page you are looking for does not exist or  Please return to the home page.',
      errorImg: 'assets/images/errors/error-404.jpg',
    },
    400: {
      message: 'Error Happend !!',
      subMessage: 'There was a problem with your request. Please check and try again or  Please return to the home page. ',
      errorImg: 'assets/images/errors/error-400.jpg',
    },
  };
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getErrorStatus();
    console.log('ServerErrorComponent initialized');
  }

  getErrorStatus() {
    this.route.params.subscribe(params => {
      if (params['status']) {
        this.errorStatus = params['status'];
      }
    });
  }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}