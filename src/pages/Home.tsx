import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { updateUser } from '../redux/userSlice';
import { useUser } from '../hooks';
import { toast } from 'react-toastify';
import styled from 'styled-components';

/**
 * Home component.
 *
 * @returns {JSX.Element} The rendered Home Page component.
 */

const Home = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user, status } = useUser();
  const navigate = useNavigate();

  interface FormData {
    companyName: string;
    numUsers: number;
    numProducts: number;
    percentage: number;
    logo?: string | null;
  }

  const [state, setState] = useState<FormData>({
    companyName: user?.companyDetails?.companyName || '',
    numUsers: user?.companyDetails?.numUsers || 0,
    numProducts: user?.companyDetails?.numProducts || 0,
    percentage: user?.companyDetails?.percentage || 0,
    logo: user?.companyDetails?.logo || null,
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const calculatePercentage = (num1: number, num2: number): number => {
    let smallerValue: number, biggerValue: number;

    if (num1 <= num2) {
      smallerValue = num1;
      biggerValue = num2;
    } else {
      smallerValue = num2;
      biggerValue = num1;
    }

    return Math.ceil((smallerValue / biggerValue) * 100);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (state?.companyName === '')
        return toast.error('Company name is required');
      dispatch(
        updateUser({
          ...user?.companyDetails,
          companyName: state?.companyName,
          numUsers: state?.numUsers,
          numProducts: state?.numProducts,
          percentage: state?.percentage,
        })
      );
      setIsEdit(false);
    } catch (error) {
      console.error('Error submitting User data:', error);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) navigate('/admin', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && user?.companyDetails && isEdit === false) {
      setState({
        companyName: user?.companyDetails?.companyName || '',
        numUsers: user?.companyDetails?.numUsers || 0,
        numProducts: user?.companyDetails?.numProducts || 0,
        percentage: user?.companyDetails?.percentage || 0,
        logo: user?.companyDetails?.logo || null,
      });
    }
  }, [user]);

  if (status === 'loading') return <h2>Saving to Database</h2>;

  return (
    <Wrapper>
      <Header>Welcome to the Data Sharing Application!</Header>
      {user && user?.companyDetails && isEdit === false ? (
        <CompanyDetails>
          <h3>Company Name: {state?.companyName}</h3>
          <h3>Number of Users: {state?.numUsers}</h3>
          <h3>Number of Products: {state?.numProducts}</h3>
          <h3>Percentage: {state?.percentage}%</h3>
          {state?.logo && <Image src={state?.logo} alt="company logo" />}
          <div>
            <Button type="button" onClick={() => setIsEdit(true)}>
              Edit Company Details
            </Button>
          </div>
        </CompanyDetails>
      ) : (
        <form onSubmit={handleSubmit}>
          <Header>Fill the form below</Header>
          <Label htmlFor="companyName">Company Name:</Label>
          <Input
            type="text"
            id="companyName"
            value={state.companyName}
            onChange={({ target: { value: companyName } }) =>
              setState({ ...state, companyName })
            }
          />
          <Label htmlFor="numProducts">Number of Products:</Label>
          <Input
            type="number"
            id="numProducts"
            value={state.numProducts}
            onChange={({ target: { value } }) =>
              setState({
                ...state,
                numProducts: parseInt(value),
                percentage: calculatePercentage(
                  state.numUsers,
                  parseInt(value)
                ),
              })
            }
          />
          <Label htmlFor="numUsers">Number of Users:</Label>
          <Input
            type="number"
            id="numUsers"
            value={state.numUsers}
            onChange={({ target: { value } }) =>
              setState({
                ...state,
                numUsers: parseInt(value),
                percentage: calculatePercentage(
                  state.numProducts,
                  parseInt(value)
                ),
              })
            }
          />
          <Label htmlFor="percentage">Percentage:</Label>
          <Input
            type="number"
            id="percentage"
            value={state.percentage}
            readOnly
          />
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const CompanyDetails = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  max-width: 200px;
`;

const Button = styled.button`
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
`;
