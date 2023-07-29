import { firebaseAuth } from '../firebase/initialize';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '.';
import { setIsAuthenticated, setUserPayload } from '../redux/userSlice';

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await firebaseAuth.signOut();
      dispatch(setIsAuthenticated(false));
      dispatch(setUserPayload(null));
      navigate('/login', { replace: true });
    } catch (error) {
      /* empty */
    }
  };
  return { logout };
};
