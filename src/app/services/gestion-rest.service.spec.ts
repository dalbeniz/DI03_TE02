import { TestBed } from '@angular/core/testing';

import { GestionRestService } from './gestion-rest.service';

describe('GestionRestService', () => {
  let service: GestionRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
