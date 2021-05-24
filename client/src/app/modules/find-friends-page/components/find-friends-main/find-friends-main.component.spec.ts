import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFriendsMainComponent } from './find-friends-main.component';

describe('FindFriendsMainComponent', () => {
  let component: FindFriendsMainComponent;
  let fixture: ComponentFixture<FindFriendsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindFriendsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindFriendsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
