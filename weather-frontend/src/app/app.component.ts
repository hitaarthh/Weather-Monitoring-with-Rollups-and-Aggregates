import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TemperatureToggleComponent } from './temperature-toggle/temperature-toggle.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TemperatureToggleComponent,
    WeatherTableComponent,
    WeatherChartComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Weather Monitoring System';
  isHome = true;  // Default to Home view

  showHome() {
    this.isHome = true;
  }

  showAbout() {
    this.isHome = false;
  }
}