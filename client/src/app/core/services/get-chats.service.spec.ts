import { TestBed } from '@angular/core/testing';

import { GetChatsService } from './get-chats.service';

describe('GetChatsService', () => {
  let service: GetChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
