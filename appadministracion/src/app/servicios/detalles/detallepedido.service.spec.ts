import { TestBed } from '@angular/core/testing';

import { DetallepedidoService } from './detallepedido.service';

describe('DetallepedidoService', () => {
  let service: DetallepedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetallepedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
