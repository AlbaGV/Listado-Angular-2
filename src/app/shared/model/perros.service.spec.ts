/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PerrosService } from './perros.service';

describe('Service: Perros', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PerrosService]
    });
  });

  it('should ...', inject([PerrosService], (service: PerrosService) => {
    expect(service).toBeTruthy();
  }));
});
