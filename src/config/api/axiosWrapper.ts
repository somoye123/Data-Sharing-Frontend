import { toast } from 'react-toastify';
import { AxiosResponse, Method, AxiosRequestConfig } from 'axios';

import Http from './axios';

interface httpWrapperPayLoad {
  method?: Method;
  url: string;
  payload?: unknown;
  cancelToken?: AxiosRequestConfig;
}

const httpWrapper = async ({
  method = 'get',
  url,
  payload,
  cancelToken,
}: httpWrapperPayLoad): Promise<AxiosResponse> => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const response: AxiosResponse = await Http[method](
      url,
      payload,
      cancelToken
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);

    toast.error(error?.response?.data?.message || 'Something went wrong');
    return Promise.reject(error);
  }
};
export default httpWrapper;
