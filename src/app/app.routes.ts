import { Routes } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MealsSliderComponent } from './shared/meals-slider/meals-slider.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ProductsComponent } from './features/products/products/products.component';
import { HomeComponent } from './features/home/home/home.component';
import { OrdersComponent } from './features/orders/orders/orders.component';
import { authGuard } from './features/Models/guards/auth.guard';
import { ServerErrorComponent } from './features/errors/server-error/server-error.component';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'ordes', component: OrdersComponent,canActivate: [authGuard]},
    {path:"Meun" ,component:ProductsComponent,canActivate: [authGuard]},
    
    {path:"login" ,component:LoginComponent},
    {path:"register" ,component:RegisterComponent},
    {path:"server-error" ,component:ServerErrorComponent},
    
];
