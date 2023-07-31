import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import login from '../firebase/login';
import { toast } from 'react-toastify';
import { useUser } from '../hooks';
import styled from 'styled-components';

/**
 * Login component.
 *
 * @returns {JSX.Element} The rendered Login Page component.
 */

const LoginForm = (): JSX.Element => {
  const { user, isAuthenticated } = useUser();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (email === '' || password === '')
        return toast.error('email and password required');
      await login({ email: email.trim(), password });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) navigate('/', { replace: true });
  }, [user, isAuthenticated, navigate]);

  return (
    <StyledForm onSubmit={handleSubmit}>
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
    </StyledForm>
  );
};

export default LoginForm;

const StyledForm = styled.form`
  margin: 4rem auto;
  max-width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  div {
    margin-bottom: 10px;
  }

  label {
    display: block;
    margin-bottom: 5px;
  }

  input {
    width: 94%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 100%;
    padding: 10px;
    margin-top: 1rem;
    font-size: 18px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
