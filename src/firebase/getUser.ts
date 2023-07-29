import {
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { firestoreDb } from './initialize';
import { OperationResult } from '../types/Sx';

import { mapAuthCodeToMessage, generalErrMsg } from './utils';

const getUser = async (userId: string): Promise<object | OperationResult> => {
  try {
    const docs: object[] = [];
    const usersRef: CollectionReference<DocumentData> = collection(
      firestoreDb,
      'users'
    );
    const q = query(usersRef, where('uid', '==', userId));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);

    if (querySnapshot) {
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      return docs[0] || {};
    } else {
      return {
        operation: 'getUser',
        isError: true,
        errorMessage: 'Firebase Firestore: unable to fetch user object.',
      };
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = mapAuthCodeToMessage(errorCode) || generalErrMsg;
    toast.error(errorMessage);

    return {
      operation: 'getUser',
      isError: true,
      errorMessage: errorMessage,
    };
  }
};

export default getUser;
