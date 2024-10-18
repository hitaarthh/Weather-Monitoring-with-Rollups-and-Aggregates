import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {
  private apiUrl = 'http://localhost:3000/api'; // Adjust this to match your backend URL

  constructor(private http: HttpClient) {}

  fetchWeatherData(): Observable<any> {
    console.log('Fetching real-time weather data...');
    return this.http.get(`${this.apiUrl}/weather`).pipe(
      tap(
        response => console.log('Real-time weather data fetched:', response),
        error => console.error('Error fetching real-time weather data:', error)
      )
    );
  }

  triggerSummary(): Observable<any> {
    console.log('Triggering daily summary calculation...');
    return this.http.get(`${this.apiUrl}/trigger-summary`).pipe(
      tap(
        response => console.log('Daily summary triggered:', response),
        error => console.error('Error triggering daily summary:', error)
      )
    );
  }

  getDailySummaries(): Observable<any> {
    console.log('Fetching daily summaries...');
    return this.triggerSummary().pipe(
      switchMap(() => this.http.get(`${this.apiUrl}/daily-summaries`)),
      tap(
        response => console.log('Daily summaries fetched:', response),
        error => console.error('Error fetching daily summaries:', error)
      )
    );
  }

  getWeatherByDateRange(startDate: string, endDate: string, city: string = 'all'): Observable<any> {
    return this.http.get(`${this.apiUrl}/historical-weather-range?city=${city}&startDate=${startDate}&endDate=${endDate}`);
  }
}