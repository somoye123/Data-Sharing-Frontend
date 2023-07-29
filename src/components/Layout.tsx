import { Outlet } from 'react-router-dom';
import Nav from './Nav';

/**
 * Layout component.
 *
 * @returns {JSX.Element} The rendered Layout component.
 */

const Layout = (): JSX.Element => {
  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
