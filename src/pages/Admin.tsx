import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '../hooks';
import { fetchNonAdmins, uploadUserLogo } from '../redux/userSlice';
import { useUser } from '../hooks';
import { FileUpload } from '../components';
import { fileUpload } from '../types/Sx';

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

  if (status === 'loading') return <p>Retrieving User A and User B</p>;
  return (
    <>
      <button type="button" onClick={() => setIsComparing((old) => !old)}>
        {isComparing ? 'Stop Comparing' : 'Compare Users'}
      </button>
      {isComparing && (
        <>
          {nonAdmins?.map(({ companyDetails, uid }, index) => (
            <div>
              <h1>User {index + 1}</h1>
              <h4>Company Name: {companyDetails?.companyName}</h4>
              <h4>Number of Users: {companyDetails?.numUsers}</h4>
              <h4>Number of Products: {companyDetails?.numProducts}</h4>
              <h4>Percentage: {companyDetails?.percentage}</h4>
              {companyDetails?.logo ? (
                <img
                  src={companyDetails?.logo}
                  alt={`User ${index + 1} company logo`}
                />
              ) : (
                <>
                  <h4>Select and upload company logo</h4>
                  <FileUpload uid={uid} uploadLogo={uploadLogo} />
                </>
              )}
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Admin;
