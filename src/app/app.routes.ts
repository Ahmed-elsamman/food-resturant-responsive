import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MealsSliderComponent } from './shared/meals-slider/meals-slider.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';

export const routes: Routes = [
    {path:"slider" ,component:MealsSliderComponent},
    {path:"login" ,component:LoginComponent},
    {path:"register" ,component:RegisterComponent},
    
];
