import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuthentication, useUser } from './hooks';
import { Layout, RequireAuth } from './components';
import { Home, Login, Unauthorized, NotFound, Admin } from './pages';

function App() {
  const { appFirstLoad } = useUser();

  useAuthentication();
  if (appFirstLoad) return <h1>Loading Application</h1>;

  return (
    <>
      <ToastContainer autoClose={3000} />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected routes */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[{ isAdmin: true }, { isAdmin: false }]}
              />
            }
          >
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[{ isAdmin: true }]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
