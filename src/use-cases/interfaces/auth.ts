import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/user';
import { IVerifyTokenReq } from '../../middleware/auth';

export interface CreateUserProps extends User {}

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

export interface CustomRequest extends Request {
	user: any;
}

export interface AuthUseCases {
	login(args: LoginProps): Promise<LoginReturnProps | undefined>;
	keepLogin(args: KeepLoginProps): Promise<any | undefined>;
}

export interface IAuthController {
	login(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	keepLogin(req: IVerifyTokenReq, res: Response, next: NextFunction): Promise<any | undefined>;
}
