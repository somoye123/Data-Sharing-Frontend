import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../config/api/axios';

import getUser from '../firebase/getUser';
import { firebaseAuth } from '../firebase/initialize';
import { useAppDispatch, useLogout } from '.';
import {
  setIsAuthenticated,
  setUserPayload,
  setAppFirstLoad,
} from '../redux/userSlice';

// Custom hook to manage authentication state
export const useAuthentication = () => {
  const dispatch = useAppDispatch();
  const { logout } = useLogout();

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user) {
        setUser.currentUser = user;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const currentFirestoreUser: any = await getUser(user.uid);
        if (currentFirestoreUser?.isError) logout();

        dispatch(
          setUserPayload({
            ...currentFirestoreUser,
          })
        );
        dispatch(setIsAuthenticated(true));
        dispatch(setAppFirstLoad(false));
      } else {
        dispatch(setAppFirstLoad(false));
      }
    });
    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, [dispatch, logout]);
};
