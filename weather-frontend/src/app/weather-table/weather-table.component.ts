import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureToggleService } from '../services/temperature-toggle-service/temperature-toggle.service';
import { WeatherApiService } from '../services/weather-api-service/weather-api.service';
import { WeatherSummaryFilterComponent } from '../weather-summary-filter/weather-summary-filter.component';

@Component({
  selector: 'app-weather-table',
  standalone: true,
  imports: [CommonModule, WeatherSummaryFilterComponent],
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.css']
})
export class WeatherTableComponent implements OnInit {
  weatherData: any[] = [];
  isCelsius: boolean = true;

  constructor(
    private temperatureService: TemperatureToggleService,
    private weatherApiService: WeatherApiService
  ) {}

  ngOnInit() {
    this.fetchWeatherData();
    this.temperatureService.isCelsius$.subscribe(isCelsius => {
      this.isCelsius = isCelsius;
    });
  }

  fetchWeatherData() {
    this.weatherApiService.getDailySummaries().subscribe({
      next: (response) => {
        this.weatherData = response.data;
      },
      error: (error) => {
        console.error('Error fetching weather data:', error);
      }
    });
  }

  onFilterApplied(dateRange: {startDate: string, endDate: string}) {
    console.log('Filter applied:', dateRange);
    this.weatherApiService.getWeatherByDateRange(dateRange.startDate, dateRange.endDate).subscribe({
      next: (response) => {
        console.log('Filtered data:', response);
        this.weatherData = response.data;
      },
      error: (error) => console.error('Error fetching filtered data:', error)
    });
  }

  convertTemp(temp: number): number {
    if (this.isCelsius) {
      return temp; // Temperature is already in Celsius
    } else {
      return temp + 273.15; // Convert Celsius to Kelvin
    }
  }

  getWeatherIcon(condition: string): string {
    const iconMap: { [key: string]: string } = {
      'Haze': 'fas fa-smog',
      'Clouds': 'fas fa-cloud',
      'Rain': 'fas fa-cloud-rain',
      'Clear': 'fas fa-sun',
      'Snow': 'fas fa-snowflake',
      'Thunderstorm': 'fas fa-bolt'
    };
    return iconMap[condition] || 'fas fa-question';
  }
}