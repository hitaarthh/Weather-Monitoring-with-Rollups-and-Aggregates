import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherSummaryFilterComponent } from './weather-summary-filter.component';

describe('WeatherSummaryFilterComponent', () => {
  let component: WeatherSummaryFilterComponent;
  let fixture: ComponentFixture<WeatherSummaryFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherSummaryFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherSummaryFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
