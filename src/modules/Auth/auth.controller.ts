import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { sendResponse } from '../../utils/response';
import { LoginDto, RegisterDto } from './dto';

const authService = new AuthService();

export const login = async (req: Request<{}, {}, LoginDto>, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    sendResponse(res, result, result.message, 200, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};

export const register = async (
  req: Request<{}, {}, RegisterDto>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;
    const result = await authService.register(name, email, password);

    sendResponse(res, result.user, result.message, 201, true);
  } catch (error: any) {
    console.error(error);
    sendResponse(res, null, error.message, error.status || 500, false);
  }
};
