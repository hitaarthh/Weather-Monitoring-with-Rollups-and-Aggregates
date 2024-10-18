import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureToggleService } from '../services/temperature-toggle-service/temperature-toggle.service';

@Component({
  selector: 'app-temperature-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './temperature-toggle.component.html',
  styleUrls: ['./temperature-toggle.component.css']
})
export class TemperatureToggleComponent implements OnInit {
  isCelsius: boolean = true;

  constructor(private temperatureService: TemperatureToggleService) {}

  ngOnInit() {
    // Set initial state to Celsius
    this.temperatureService.setUnit(true);
    
    // Subscribe to the service to get the updated unit state
    this.temperatureService.isCelsius$.subscribe(isCelsius => {
      this.isCelsius = isCelsius;
    });
  }

  // Method to toggle the temperature unit
  toggleUnit(): void {
    this.temperatureService.toggleUnit();
  }
}