import { TestBed } from '@angular/core/testing';

import { GameResultService } from './game-result.service';

describe('GameResultService', () => {
  let service: GameResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
