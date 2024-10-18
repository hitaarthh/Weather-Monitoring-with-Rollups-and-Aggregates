import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherApiService } from '../services/weather-api-service/weather-api.service';

@Component({
  selector: 'app-weather-summary-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './weather-summary-filter.component.html',
  styleUrls: ['./weather-summary-filter.component.css']
})
export class WeatherSummaryFilterComponent {
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Output() filterApplied = new EventEmitter<{startDate: string, endDate: string}>();

  constructor(private weatherApiService: WeatherApiService) {}

  applyFilter() {
    console.log('Applying filter with dates:', this.startDate, this.endDate);
    this.filterApplied.emit({startDate: this.startDate, endDate: this.endDate});
  }
}