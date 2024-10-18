import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TemperatureToggleService {
  // This BehaviorSubject will hold the current unit (true = Celsius, false = Kelvin)
  private isCelsiusSubject = new BehaviorSubject<boolean>(true);
  
  // Expose the observable
  isCelsius$ = this.isCelsiusSubject.asObservable();

  // Function to toggle the unit
  toggleUnit(): void {
    const currentUnit = this.isCelsiusSubject.value;
    this.isCelsiusSubject.next(!currentUnit);
  }

  // Function to set the unit
  setUnit(isCelsius: boolean): void {
    this.isCelsiusSubject.next(isCelsius);
  }
}