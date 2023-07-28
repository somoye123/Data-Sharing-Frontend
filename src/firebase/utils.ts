type AuthCodeMessages = {
  [key: string]: string;
};

const authCodeMessages: AuthCodeMessages = {
  'auth/invalid-password': 'Invalid password',
  'auth/invalid-email': 'Invalid email',
  'auth/invalid-phone-number': 'Phone number provided is invalid',
  'auth/email-already-in-use': 'Email provided is already in use',
  'auth/email-already-exists': 'Email provided is already in use',
  'auth/user-not-found': 'User not found',
  'auth/wrong-password': 'Incorrect email/password',
  'auth/invalid-photo-url': 'Invalid photo url',
  'auth/invalid-uid': 'Invalid uid',
  'auth/uid-already-exists': 'uid already exists',
  'auth/missing-uid': 'uid is required',
  'auth/session-cookie-expired': 'Session cookie expired',
  'auth/too-many-requests': 'Too many requests, please try again later',
  'auth/operation-not-allowed': 'Operation not allowed',
  'auth/weak-password': 'Password provided is too weak',
  'auth/missing-email': 'Email is required',
  'auth/missing-password': 'Password is required',
  'auth/internal-error': 'Internal error, please try again later',
  'auth/invalid-verification-code': 'Invalid verification code',
  'auth/invalid-verification-id': 'Invalid verification id',
  'auth/code-expired': 'Code expired, please try again',
  'auth/invalid-credential': 'Invalid credential',
  'auth/id-token-expired': 'The provided Firebase ID token is expired',
};

export const mapAuthCodeToMessage = (
  authCode: keyof AuthCodeMessages
): string => {
  return authCodeMessages[authCode] || '';
};

export const generalErrMsg = 'An error occured, please try again later.';

export const generalAuthErrMsgs = {
  login: 'Error logging in. Please try again.',
  update: 'Error updating credential. Please try again.',
};

export const GeneralCrudErrMsgs = {
  create: 'Error creating document. Please try again.',
  read: 'Error fetching document. Please try again.',
  update: 'Error updating document. Please try again.',
  delete: 'Error deleting document. Please try again.',
};
