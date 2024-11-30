import { Request, Response, NextFunction } from 'express';
import { IAuthController, VerifyTokenWithUserProps } from '../../use-cases/interfaces/auth.interface';
import { AuthInteractor } from '../../use-cases/interactor/auth.interactor';
import {ResponseHandler} from "../../utils/response-handler";

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
			return ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
	}

	async login(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { email, password } = req.body;
			const args = { email, password };
			const data = await this.interactor.login(args);
			return ResponseHandler.generateResponse(res, 200, data);
		} catch (error) {
			next(error);
		}
	}
}
