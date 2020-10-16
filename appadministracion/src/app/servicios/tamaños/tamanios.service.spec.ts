import { TestBed } from '@angular/core/testing';

import { TamaniosService } from './tamanios.service';

describe('TamaniosService', () => {
  let service: TamaniosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TamaniosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
