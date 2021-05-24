import { TestBed } from '@angular/core/testing';

import { GetFriendsService } from './get-friends.service';

describe('GetFriendsService', () => {
  let service: GetFriendsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetFriendsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
