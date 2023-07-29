import { useState, ChangeEvent } from 'react';
import { fileUpload } from '../types/Sx';

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
      if (selectedFile) {
        uploadLogo({ uid, file: selectedFile });
      } else {
        console.log('No file selected.');
      }
    } catch (error) {
      console.error('Error submitting User data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/svg"
      />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
