import { Component } from '@angular/core';
import { MealsSliderComponent } from '../../../shared/meals-slider/meals-slider.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ MealsSliderComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

}
