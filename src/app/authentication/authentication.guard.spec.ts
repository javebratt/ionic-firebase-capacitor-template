import { TestBed } from '@angular/core/testing';

import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

const setup = () => {
  const mockAuth = jasmine.createSpyObj('AuthenticationService', [
    'isLoggedIn',
  ]);
  TestBed.configureTestingModule({
    providers: [{ provide: AuthenticationService, useValue: mockAuth }],
  });
  const service = TestBed.inject(AuthenticationGuard);

  return { service };
};

describe('AuthenticationGuard', () => {
  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });
});
