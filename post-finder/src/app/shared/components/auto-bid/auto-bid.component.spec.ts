import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoBidComponent } from './auto-bid.component';

describe('AutoBidComponent', () => {
  let component: AutoBidComponent;
  let fixture: ComponentFixture<AutoBidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoBidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
