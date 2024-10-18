import { Routes } from '@angular/router';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';

export const routes: Routes = [
  { path: '', component: WeatherTableComponent },
  { path: 'chart', component: WeatherChartComponent }
];