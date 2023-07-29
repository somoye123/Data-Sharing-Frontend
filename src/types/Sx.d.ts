export interface User {
  uid: string;
  accessToken: string;
  refreshToken: string;
  expirationTime: number;
  name: string;
  userId: string;
  isAdmin: boolean;
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
}

export interface OperationResult {
  operation: string;
  isError: boolean;
  errorMessage?: string;
  successMessage?: string;
}
