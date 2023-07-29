import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import login from '../firebase/login';
import { toast } from 'react-toastify';
import { useUser } from '../hooks';

/**
 * Login component.
 *
 * @returns {JSX.Element} The rendered Login Page component.
 */

const LoginForm = (): JSX.Element => {
  const { user, isAuthenticated } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (email === '' || password === '')
        return toast.error('email and password required');
      await login({ email, password });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) navigate(from, { replace: true });
  }, [user, isAuthenticated, navigate, from]);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
