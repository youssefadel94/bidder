import { TestBed } from '@angular/core/testing';

import { AppRouteGuard } from './auth-route-guard.service';

describe('AuthRouteGuardService', () => {
  let service: AppRouteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRouteGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
