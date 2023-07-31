import { useState, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { fileUpload } from '../types/Sx';
import styled from 'styled-components';

interface FileUploadProps {
  uid: string;
  uploadLogo: (data: fileUpload) => void;
}

/**
 * FileUpload component.
 *
 * @returns {JSX.Element} The rendered FileUpload component.
 */

const FileUpload = ({ uid, uploadLogo }: FileUploadProps): JSX.Element => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0)
      setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      if (!selectedFile) return toast.error('No file selected.');
      const file = new FormData();
      file.append('companyLogo', selectedFile);

      uploadLogo({ uid, file });
    } catch (error) {
      console.error('Error submitting User data:', error);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <input
        type="file"
        id="fileInput"
        name="companyLogo"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/svg"
      />
      <UploadButton type="submit">Upload</UploadButton>
    </StyledForm>
  );
};

export default FileUpload;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
`;

const UploadButton = styled.button`
  padding: 8px 12px;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
