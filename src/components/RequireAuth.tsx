import { useLocation, Navigate, Outlet } from 'react-router-dom';
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

  const location = useLocation();

  return user &&
    allowedRoles?.length > 0 &&
    allowedRoles.find(({ isAdmin }) => isAdmin === user?.isAdmin) ? (
    <Outlet />
  ) : isAuthenticated ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
