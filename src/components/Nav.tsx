import { useUser, useLogout } from '../hooks';
import styled from 'styled-components';

/**
 * Nav component.
 *
 * @returns {JSX.Element} The rendered Nav component.
 */

const Nav = (): JSX.Element => {
  const { isAuthenticated: isLoggedIn } = useUser();
  const { logout } = useLogout();

  return isLoggedIn ? (
    <Wrapper>
      <LogoutButton onClick={() => logout()}>Logout</LogoutButton>
    </Wrapper>
  ) : (
    <></>
  );
};

export default Nav;

const Wrapper = styled.nav`
  display: flex;
  justify-content: flex-end;
`;

const LogoutButton = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  border: 2px solid black;
`;
