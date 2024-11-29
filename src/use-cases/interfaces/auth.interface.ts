import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';

export interface VerifyTokenWithUserProps extends Request {
	user?: any;
}

export interface RequestWithUserProps extends Request {
	user?: any;
}

export type LoginReturnUserProps = Omit<User, 'password'>;

export interface LoginProps {
	email: string;
	password: string;
}

export interface LoginReturnProps {
	user: LoginReturnUserProps;
	token: string;
}

export interface KeepLoginProps {
	id: number;
}

export interface AuthUseCases {
	login(args: LoginProps): Promise<LoginReturnProps | undefined>;
	keepLogin(args: KeepLoginProps): Promise<any | undefined>;
	googleLogin(): Promise<any | undefined>;
}

export interface IAuthController {
	login(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	keepLogin(
		req: VerifyTokenWithUserProps,
		res: Response,
		next: NextFunction,
	): Promise<any | undefined>;
	googleLogin(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}
