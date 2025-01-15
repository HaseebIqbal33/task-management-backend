import { ResponseT } from '../interfaces/response';
import { Response } from 'express';

export const customResponse = <T>({
  data,
  success,
  message,
  status,
}: ResponseT<T>) => {
  return {
    success,
    message,
    status,
    data,
  };
};

export const sendResponse = <T>(
  res: Response,
  data?: any,
  message: string = '',
  status: number = 200,
  success: boolean = true
): void => {
  const response: ResponseT<T> = {
    success,
    message,
    status,
    data,
  };

  res.status(status).send(response);
};
