import { TestBed } from '@angular/core/testing';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

import { AuthenticationService } from './authentication.service';

const setup = () => {
  const mockAuth = jasmine.createSpyObj('Auth', ['signInWithEmailAndPassword']);
  const mockFirestore = jasmine.createSpyObj('Firestore', ['addDoc']);
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
