import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { AuthCredentials } from './authentication.models';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly auth: Auth,
    private readonly firestore: Firestore
  ) {}

  getUser(): Observable<User | null> {
    return authState(this.auth);
  }

  isLoggedIn(): Observable<boolean> {
    return this.getUser().pipe(map(Boolean));
  }

  login({ email, password }: AuthCredentials): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async signup({ email, password }: AuthCredentials): Promise<User> {
    try {
      const newUserCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, password);
      const userReference = doc(
        this.firestore,
        `users/${newUserCredential.user.uid}`
      );
      await setDoc(userReference, { email }, { merge: true });
      await sendEmailVerification(newUserCredential.user);
      return newUserCredential.user;
    } catch (error) {
      throw error;
    }
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }
}
