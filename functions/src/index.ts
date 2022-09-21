import * as functions from 'firebase-functions';

export const beforeLogin = functions.auth.user().beforeSignIn((user) => {
  if (!user.emailVerified) {
    throw new functions.auth.HttpsError(
      'invalid-argument',
      `The email "${user.email}" has not been verified.`
    );
  }
});
