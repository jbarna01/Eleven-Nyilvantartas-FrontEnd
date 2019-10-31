import { TestBed } from '@angular/core/testing';

import { JogokService } from './jogok.service';

describe('JogokService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JogokService = TestBed.get(JogokService);
    expect(service).toBeTruthy();
  });
});
