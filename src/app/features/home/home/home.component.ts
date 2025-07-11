import { Component } from '@angular/core';
import { MealsSliderComponent } from '../../../shared/meals-slider/meals-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MealsSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
