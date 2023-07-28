const statusResponse = {
  422: 'Unprocessable value',
  415: 'Sorry, this media type is unsupported',
  200: 'Request was successful.',
  201: 'Request successfully created.',
  202: 'Request successfully accepted.',
  502: 'Sorry, this Service is temporarily unavailable',
  503: 'Sorry, this Service is temporarily unavailable',
  404: 'Your request was not found.',
  401: 'You are not authorized to make this request.',
  400: 'Your request was not successful. Please check your Submitted request.',
  204: 'Your Request have no content',
  500: 'Internal server error',
  403: 'Sorry, you have no permission to make this request',
  408: 'Sorry, your request took too long. Please refresh your page and try again.',
  504: 'Sorry, your request was not sent. Please refresh your page and try again.',
  409: 'Sorry, there was a conflict with your request. Please refresh your page and try again.',
};

const statusMessage = (item) => ({
  error:
    item?.response?.data?.error
    || item?.response?.data?.msg
    || statusResponse[item?.status]
    || item?.response?.data?.message
    || item?.response?.data?.error
    || item?.message
    || 'Something went wrong',

  success:
    statusResponse[item?.status]
    || item?.data?.message
    || item?.message
    || 'Request successful',
});

export default statusMessage;
