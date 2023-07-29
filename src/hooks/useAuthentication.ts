/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import getUser from '../firebase/getUser';
import { firebaseAuth } from '../firebase/initialize';
import { useAppDispatch, useLogout } from '.';
import { setIsAuthenticated, setUserPayload } from '../redux/userSlice';

// Custom hook to manage authentication state
export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        const currentFirestoreUser: any = await getUser(user.uid);
        if (currentFirestoreUser?.isError) logout();

        const { uid: id, stsTokenManager, accessToken } = user as any;

        dispatch(
          setUserPayload({
            uid: id,
            accessToken,
            ...stsTokenManager,
            ...currentFirestoreUser,
          })
        );
        dispatch(setIsAuthenticated(true));
      } else {
        /* empty */
      }
    });
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [dispatch, logout]);
};
