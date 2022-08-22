import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly auth: Auth) {}

  login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }
}
