import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { WeatherApiService } from './services/weather-api-service/weather-api.service';
import { TemperatureToggleService } from './services/temperature-toggle-service/temperature-toggle.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    WeatherApiService,
    TemperatureToggleService
  ]
};