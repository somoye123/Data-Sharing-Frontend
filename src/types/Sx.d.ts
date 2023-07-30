export interface User {
  id: string | null;
  uid: string;
  name: string;
  isAdmin: boolean;
  userId: string;
  email: string;
  companyDetails?: UserCompanyDetails | null;
  createdAt?: {
    seconds?: number;
    nanoseconds?: number;
  };
  updatedAt?: {
    seconds?: number;
    nanoseconds?: number;
  };
}

export interface UserCompanyDetails {
  companyName: string;
  numUsers: number;
  numProducts: number;
  percentage: number;
  logo?: string;
}

export interface OperationResult {
  operation: string;
  isError: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export interface fileUpload {
  uid: string;
  file: FormData;
}
