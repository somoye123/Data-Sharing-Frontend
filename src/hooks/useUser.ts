import { useAppSelector } from './useRedux';
import { currentUser } from '../redux/userSlice';

export const useUser = () => useAppSelector(currentUser);
