import { TestBed } from '@angular/core/testing';

import { GetJwtService } from './get-jwt.service';

describe('GetJwtService', () => {
  let service: GetJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
