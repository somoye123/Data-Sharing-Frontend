import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks';

interface RequireAuthProps {
  allowedRoles: Array<{ isAdmin: boolean }>;
}

/**
 * RequireAuth component.
 *
 * @returns {JSX.Element} The rendered RequireAuth component.
 */

const RequireAuth = ({ allowedRoles }: RequireAuthProps): JSX.Element => {
  const { user, isAuthenticated } = useUser();

  return user &&
    allowedRoles?.length > 0 &&
    allowedRoles.find(({ isAdmin }) => isAdmin === user?.isAdmin) ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuth;
