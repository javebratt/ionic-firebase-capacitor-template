import { fakeAsync, TestBed } from '@angular/core/testing';
import { createSpyFromClass } from 'jasmine-auto-spies';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

const setup = () => {
  const mockAuthenticationService = createSpyFromClass(AuthenticationService, {
    methodsToSpyOn: ['isLoggedIn'],
  });

  TestBed.configureTestingModule({
    imports: [RouterTestingModule],
    providers: [
      { provide: AuthenticationService, useValue: mockAuthenticationService },
    ],
  });

  const service = TestBed.inject(AuthenticationGuard);
  const router = TestBed.inject(Router);
  return { service, mockAuthenticationService, router };
};

describe('AuthenticationGuard', () => {
  it('creates the guard', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });

  describe('canActivate', () => {
    it('returns true if the user is logged in', () => {
      const { mockAuthenticationService } = setup();

      mockAuthenticationService.isLoggedIn.and.nextWith(true);

      const isLoggedInSpy = subscribeSpyTo(
        mockAuthenticationService.isLoggedIn()
      ).getLastValue();

      expect(isLoggedInSpy).toBeTrue();
    });

    it('returns false if the user is not logged in', fakeAsync(() => {
      const { mockAuthenticationService, router } = setup();

      mockAuthenticationService.isLoggedIn.and.nextWith(false);

      const isLoggedInSpy = subscribeSpyTo(
        mockAuthenticationService.isLoggedIn()
      ).getLastValue();

      expect(isLoggedInSpy).toBeFalse();
    }));
  });
});
