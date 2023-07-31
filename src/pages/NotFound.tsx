import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundText>Page Not Found</NotFoundText>
      <Link to="/">
        <BackButton>Go Back to Home</BackButton>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFound;

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const NotFoundTitle = styled.h1`
  font-size: 80px;
  font-weight: bold;
  color: #ff0000;
  margin-bottom: 10px;
`;

const NotFoundText = styled.p`
  font-size: 24px;
  color: #333;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
`;
