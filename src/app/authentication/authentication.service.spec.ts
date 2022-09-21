import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { createSpyFromClass } from 'jasmine-auto-spies';

import { AuthenticationService } from './authentication.service';

const setup = () => {
  const mockAuth = createSpyFromClass(Auth);
  const mockFirestore = createSpyFromClass(Firestore);

  TestBed.configureTestingModule({
    providers: [
      { provide: Auth, useValue: mockAuth },
      { provide: Firestore, useValue: mockFirestore },
    ],
  });
  const service = TestBed.inject(AuthenticationService);

  return { service };
};

describe('AuthenticationService', () => {
  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });
});
