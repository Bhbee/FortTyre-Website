import ApiErrorType from "../Types/ApiErrortype";

export const getError = (error: ApiErrorType) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message
}
