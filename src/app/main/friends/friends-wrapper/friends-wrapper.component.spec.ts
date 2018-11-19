import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsWrapperComponent } from './friends-wrapper.component';

describe('FriendsWrapperComponent', () => {
  let component: FriendsWrapperComponent;
  let fixture: ComponentFixture<FriendsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
