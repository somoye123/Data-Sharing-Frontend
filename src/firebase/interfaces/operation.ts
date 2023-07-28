interface OperationResult {
  operation: string;
  isError: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export default OperationResult;
