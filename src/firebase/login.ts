import { toast } from 'react-toastify';
import { UserCredential } from 'firebase/auth';

import { OperationResult, User } from '../types/Sx';

import { firebaseAuth, signInWithEmailAndPassword } from './initialize';
import { mapAuthCodeToMessage, generalAuthErrMsgs } from './utils';
import getUser from './getUser';

interface LoginPayLoad {
  email: string;
  password: string;
}

const login = async ({
  email,
  password,
}: LoginPayLoad): Promise<User | object | OperationResult> => {
  try {
    const result: UserCredential = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    if (result?.user) {
      const user = await getUser(result.user.uid);
      if (user) {
        toast.success('You have successfully logged into your account');
        return user;
      } else {
        toast.error('Firebase Auth: login failed.');
        return {
          operation: 'login',
          isError: true,
          errorMessage: 'Firebase Auth: login failed.',
        };
      }
    } else {
      toast.error('Firebase Auth: login failed.');
      return {
        operation: 'login',
        isError: true,
        errorMessage: 'Firebase Auth: login failed.',
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage =
      mapAuthCodeToMessage(errorCode) || generalAuthErrMsgs.login;
    toast.error(errorMessage);

    const errMessage = {
      operation: 'login',
      isError: true,
      errorMessage: errorMessage,
      error,
    };
    return Promise.reject(errMessage);
  }
};

export default login;
