import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { updateUser } from '../redux/userSlice';
import { useUser } from '../hooks';

/**
 * Home component.
 *
 * @returns {JSX.Element} The rendered Home Page component.
 */

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useUser();
  const navigate = useNavigate();

  interface FormData {
    companyName: string;
    numUsers: number;
    numProducts: number;
    percentage: number;
  }

  const [state, setState] = useState<FormData>({
    companyName: '',
    numUsers: 0,
    numProducts: 0,
    percentage: 0,
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const percentage: number = (state.numUsers / state.numProducts) * 100;
      dispatch(updateUser({ ...state, percentage }));
      setIsEdit(false);
    } catch (error) {
      console.error('Error submitting User data:', error);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) navigate('/admin', { replace: true });
  }, [navigate, user?.isAdmin]);

  useEffect(() => {
    if (user && user?.companyDetails) {
      setState({
        companyName: user?.companyDetails?.companyName || '',
        numUsers: user?.companyDetails?.numUsers || 0,
        numProducts: user?.companyDetails?.numProducts || 0,
        percentage: user?.companyDetails?.percentage || 0,
      });
    }
  }, [user]);

  return (
    <>
      <h1>Welcome to the Data Sharing Application!</h1>
      {user && user?.companyDetails && isEdit === false ? (
        <>
          <h1>Company Name: {state?.companyName}</h1>
          <h1>Number of Users: {state?.numUsers}</h1>
          <h1>Number of Products: {state?.numProducts}</h1>
          <h1>Percentage: {state?.percentage}</h1>
          <button type="button" onClick={() => setIsEdit(true)}>
            Edit Company Details
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Fill the form below</h2>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={state.companyName}
            onChange={({ target: { value: companyName } }) =>
              setState({ ...state, companyName })
            }
          />
          <label htmlFor="numUsers">Number of Users:</label>
          <input
            type="number"
            id="numUsers"
            value={state.numUsers}
            onChange={({ target: { value } }) =>
              setState({ ...state, numUsers: parseInt(value) })
            }
          />
          <label htmlFor="numProducts">Number of Products:</label>
          <input
            type="number"
            value={state.numProducts}
            onChange={({ target: { value } }) =>
              setState({ ...state, numProducts: parseInt(value) })
            }
          />
          <button type="submit">Submit To Database</button>
        </form>
      )}
    </>
  );
};

export default Home;
