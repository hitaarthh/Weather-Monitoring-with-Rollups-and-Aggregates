import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration } from 'chart.js/auto';
import { WeatherApiService } from '../services/weather-api-service/weather-api.service';

@Component({
  selector: 'app-weather-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="chart-container">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      height: 60vh;
      width: 100%;
      margin-top: 20px;
    }
  `]
})
export class WeatherChartComponent implements OnInit, AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  
  parameters = ['avgTemp', 'maxTemp', 'minTemp', 'humidity', 'precipitation'];
  chart: Chart | null = null;

  constructor(private weatherApiService: WeatherApiService) {}

  ngOnInit() {
    this.fetchDataAndCreateChart();
  }

  ngAfterViewInit() {
    this.resizeChart();
    window.addEventListener('resize', () => this.resizeChart());
  }

  fetchDataAndCreateChart() {
    this.weatherApiService.getDailySummaries().subscribe(
      (data: any) => {
        this.createChart(data);
      },
      error => console.error('Error fetching data:', error)
    );
  }

  createChart(data: any) {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: data.data.map((item: any) => item.city),
        datasets: this.parameters.map((param, index) => ({
          label: this.getChartLabel(param),
          data: data.data.map((item: any) => item[param]),
          borderColor: this.getChartColor(index),
          backgroundColor: this.getChartColor(index, 0.1),
          fill: false,
          tension: 0.1
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value'
            }
          },
          x: {
            title: {
              display: true,
              text: 'City'
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Weather Parameters by City'
          }
        }
      }
    };
    this.chart = new Chart(ctx, config);
  }

  resizeChart() {
    if (this.chart) {
      this.chart.resize();
    }
  }

  getChartLabel(param: string): string {
    const labels: { [key: string]: string } = {
      avgTemp: 'Average Temperature',
      maxTemp: 'Maximum Temperature',
      minTemp: 'Minimum Temperature',
      humidity: 'Humidity',
      precipitation: 'Precipitation'
    };
    return labels[param] || param;
  }

  getChartColor(index: number, alpha: number = 1): string {
    const colors = [
      `rgba(75, 192, 192, ${alpha})`,
      `rgba(255, 99, 132, ${alpha})`,
      `rgba(54, 162, 235, ${alpha})`,
      `rgba(255, 206, 86, ${alpha})`,
      `rgba(153, 102, 255, ${alpha})`
    ];
    return colors[index % colors.length];
  }
}