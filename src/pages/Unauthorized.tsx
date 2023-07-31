import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <NotAuthorizedContainer>
      <NotAuthorizedTitle>Not Authorized</NotAuthorizedTitle>
      <NotAuthorizedText>
        You don't have permission to access this page.
      </NotAuthorizedText>
      <Link to="/">
        <BackButton>Go Back to Home</BackButton>
      </Link>
    </NotAuthorizedContainer>
  );
};

export default NotAuthorized;

const NotAuthorizedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const NotAuthorizedTitle = styled.h1`
  font-size: 80px;
  font-weight: bold;
  color: #ff0000;
  margin-bottom: 10px;
`;

const NotAuthorizedText = styled.p`
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
