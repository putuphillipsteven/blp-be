import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/user';

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

export interface AuthUseCases {
	login(args: LoginProps): Promise<LoginReturnProps | undefined>;
}

export interface IAuthController {
	login(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}
