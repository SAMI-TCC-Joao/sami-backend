import { error } from '../errorHandlers/customErrorList';
import CustomError from '../errorHandlers/CustomError';

const validateData = async (data) => {
  if (!data) {
    throw new CustomError(error.BAD_REQUEST.invalidCredentials);
  }

  return data;
};

export { validateData };
