import { TestBed } from '@angular/core/testing';

import { TipopostService } from './tipopost.service';

describe('TipopostService', () => {
  let service: TipopostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipopostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
