import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import login from '../firebase/login';
import { toast } from 'react-toastify';
import { useUser } from '../hooks';

const LoginForm = () => {
  const { user, isAuthenticated } = useUser();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: { preventDefault: () => void }) => {
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
