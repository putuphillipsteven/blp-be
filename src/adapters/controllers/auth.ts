import { Request, Response, NextFunction } from 'express';
import { IAuthController, VerifyTokenWithUserProps } from '../../use-cases/interfaces/auth';
import { AuthInteractor } from '../../use-cases/interactor/auth';
import { sendResponse } from '../../utils/utilts';

export class AuthController implements IAuthController {
	private interactor: AuthInteractor;
	constructor(interactor: AuthInteractor) {
		this.interactor = interactor;
	}
	googleLogin(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		throw new Error('Method not implemented.');
	}
	async keepLogin(
		req: VerifyTokenWithUserProps,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined> {
		try {
			const { id } = req.user;
			const args = { id };
			const result = await this.interactor.keepLogin(args);
			return sendResponse(res, 200, 'Keep Login Success', result);
		} catch (error) {
			next(error);
		}
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
