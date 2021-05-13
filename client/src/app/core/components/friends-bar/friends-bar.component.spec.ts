import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsBarComponent } from './friends-bar.component';

describe('FriendsBarComponent', () => {
  let component: FriendsBarComponent;
  let fixture: ComponentFixture<FriendsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
