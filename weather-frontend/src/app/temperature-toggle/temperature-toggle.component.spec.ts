import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureToggleComponent } from './temperature-toggle.component';

describe('TemperatureToggleComponent', () => {
  let component: TemperatureToggleComponent;
  let fixture: ComponentFixture<TemperatureToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureToggleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperatureToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
