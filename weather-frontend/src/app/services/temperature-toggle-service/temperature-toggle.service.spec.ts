import { TestBed } from '@angular/core/testing';

import { TemperatureToggleService } from '../temperature-toggle-service/temperature-toggle.service';

describe('TemperatureToggleService', () => {
  let service: TemperatureToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
