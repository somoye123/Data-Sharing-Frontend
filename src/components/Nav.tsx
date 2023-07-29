import { useUser, useLogout } from '../hooks';

const Nav = () => {
  const { isAuthenticated: isLoggedIn } = useUser();
  const { logout } = useLogout();

  return isLoggedIn ? (
    <button onClick={() => logout()}>logout</button>
  ) : (
    'Login form below'
  );
};

export default Nav;
