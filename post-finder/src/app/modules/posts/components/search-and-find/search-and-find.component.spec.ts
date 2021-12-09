import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAndFindComponent } from './search-and-find.component';

describe('SearchAndFindComponent', () => {
  let component: SearchAndFindComponent;
  let fixture: ComponentFixture<SearchAndFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAndFindComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAndFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
