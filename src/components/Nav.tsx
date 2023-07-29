import { useUser, useLogout } from '../hooks';

/**
 * Nav component.
 *
 * @returns {JSX.Element} The rendered Nav component.
 */

const Nav = (): JSX.Element => {
  const { isAuthenticated: isLoggedIn } = useUser();
  const { logout } = useLogout();

  return isLoggedIn ? (
    <button onClick={() => logout()}>logout</button>
  ) : (
    <p>'Login form below'</p>
  );
};

export default Nav;
