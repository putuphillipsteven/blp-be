import { Request, Response, NextFunction } from 'express';
import { IAuthController } from '../../use-cases/interfaces/i.auth';
import { AuthInteractor } from '../../use-cases/interactor/auth.interactor';
import { sendResponse } from '../../utils/utilts';

export class AuthController implements IAuthController {
	private interactor: AuthInteractor;
	constructor(interactor: AuthInteractor) {
		this.interactor = interactor;
	}
	async login(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { email, password } = req.body;
			const args = { email, password };
			const data = await this.interactor.login(args);
			return sendResponse(res, 200, 'Login Success', data);
		} catch (error) {
			next(error);
		}
	}
}
