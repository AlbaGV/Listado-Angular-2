/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DetallesService } from './detalles.service';

describe('Service: Detalles', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetallesService]
    });
  });

  it('should ...', inject([DetallesService], (service: DetallesService) => {
    expect(service).toBeTruthy();
  }));
});
