import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { WeatherChartComponent } from './weather-chart/weather-chart.component';
import { TemperatureToggleComponent } from './temperature-toggle/temperature-toggle.component';
import { routes } from './app.routes';  // Import your routes
import { WeatherSummaryFilterComponent } from './weather-summary-filter/weather-summary-filter.component';

@NgModule({
  declarations: [  // Declare your components here
    AppComponent,
    WeatherTableComponent,
    WeatherChartComponent,
    WeatherSummaryFilterComponent,
    TemperatureToggleComponent
  ],
  imports: [  // Import Angular modules here
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]  // Bootstrapping the main component
})
export class AppModule { }
