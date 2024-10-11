import { NextFunction, Request, Response } from 'express';
import { loginService } from '../services/authService';
import { sendResponse } from '../../utils/utilts';

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const result = await loginService(req.body);
		sendResponse(res, 200, 'Login Success', result);
	} catch (err) {
		next(err);
	}
};
