import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchNonAdmins, uploadUserLogo } from '../redux/userSlice';
import { useUser } from '../hooks';
import { FileUpload, Table } from '../components';
import { fileUpload } from '../types/Sx';
import styled from 'styled-components';

const Admin = () => {
  const [isComparing, setIsComparing] = useState<boolean>(false);

  const { nonAdmins, status } = useUser();

  const dispatch = useAppDispatch();

  const uploadLogo = (data: fileUpload) => {
    try {
      dispatch(uploadUserLogo(data));
    } catch (error) {
      console.log('No file selected.');
    }
  };

  const fetchUsers = useCallback(() => {
    try {
      dispatch(fetchNonAdmins());
    } catch (err) {
      console.log('err');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (status === 'loading') return <h1>Retrieving User A and User B</h1>;
  return (
    <>
      <Button type="button" onClick={() => setIsComparing((old) => !old)}>
        {isComparing ? 'Stop Comparing' : 'Compare Users'}
      </Button>
      {isComparing ? (
        <Table data={nonAdmins} />
      ) : (
        <>
          {nonAdmins?.map(({ companyDetails, uid }, index) => (
            <UserContainer key={uid}>
              <h1>User {index + 1}</h1>
              {companyDetails ? (
                <>
                  <h4>Company Name: {companyDetails?.companyName}</h4>
                  <h4>Number of Users: {companyDetails?.numUsers}</h4>
                  <h4>Number of Products: {companyDetails?.numProducts}</h4>
                  <h4>Percentage: {companyDetails?.percentage}</h4>
                  {companyDetails?.logo ? (
                    <>
                      <img
                        src={companyDetails?.logo}
                        alt={`User ${index + 1} company logo`}
                      />
                      <h4>Select and UPDATE current logo</h4>
                      <FileUpload uid={uid} uploadLogo={uploadLogo} />
                    </>
                  ) : (
                    <>
                      <h4>Select and upload company logo</h4>
                      <FileUpload uid={uid} uploadLogo={uploadLogo} />
                    </>
                  )}
                </>
              ) : (
                <NoDetails>No inputed Details Yet by the user</NoDetails>
              )}
            </UserContainer>
          ))}
        </>
      )}
    </>
  );
};

export default Admin;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const UserContainer = styled.div`
  margin: 20px 0;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h4 {
    margin-bottom: 5px;
  }

  img {
    max-width: 200px;
    margin-top: 10px;
  }
`;

const NoDetails = styled.p`
  margin: 10px 0;
`;
