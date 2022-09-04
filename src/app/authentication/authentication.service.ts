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
  GoogleAuthProvider,
  signInWithPopup,
  updateCurrentUser,
  updateProfile,
} from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { AuthCredentials } from './authentication.models';
import { isPlatform } from '@ionic/angular';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { googleClientId } from '../../environments/credentials';

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

  async login({ email, password }: AuthCredentials): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        throw new Error(
          'There was a problem with your email or password, please try again'
        );
      } else {
        throw new Error('Something went wrong, please try again later');
      }
    }
  }

  async signup({ email, password, name }: AuthCredentials): Promise<User> {
    try {
      const newUserCredential: UserCredential =
        await createUserWithEmailAndPassword(this.auth, email, password);
      await updateProfile(newUserCredential.user, {
        displayName: name,
      });
      const userReference = doc(
        this.firestore,
        `users/${newUserCredential.user.uid}`
      );
      await setDoc(userReference, { email, name }, { merge: true });
      await sendEmailVerification(newUserCredential.user);
      return newUserCredential.user;
    } catch (error: any) {
      console.dir(error);
      if (error.code === 'auth/invalid-email') {
        throw new Error('Please enter a valid email address and try again.');
      } else if (error.code === 'auth/weak-password') {
        throw new Error(
          'Your password is too short, it needs to be at least 6 characters long'
        );
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('That email is already in use');
      } else {
        throw new Error('Something went wrong, please try again later');
      }
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/wrong-password'
      ) {
        throw new Error(
          'There was a problem with your email or password, please try again'
        );
      } else {
        throw new Error('Something went wrong, please try again later');
      }
    }
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log(result);
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // signInWithCredential(this.auth, credential);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
}
