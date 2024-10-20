import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/user';

export type ReturnUserProps = Omit<
	User,
	'password' | 'created_at' | 'deleted_at' | 'updated_at' | 'gender_id'
>;

export interface GetUserProps {
	name: string;
	phone_number: string;
	role_id: number;
	page: number;
	page_size: number;
}

export interface CreateUserProps extends User {}

export type UpdateUserProps = Omit<User, 'email' | 'password'>;

export type UserDetailsReturnProps = Omit<User, 'password'>;

export interface GetUserDetailsProps {
	id: number;
}

export interface UserUseCases {
	get(args: GetUserProps): Promise<ReturnUserProps[] | undefined>;
	getDetails(args: GetUserDetailsProps): Promise<UserDetailsReturnProps | null>;
	create(args: CreateUserProps): Promise<ReturnUserProps | undefined>;
	update(args: any): Promise<ReturnUserProps | undefined>;
	delete(args: any): Promise<ReturnUserProps | undefined>;
	createWithGoogle(args: CreateUserProps): Promise<any | undefined>;
}

export interface IUserController {
	get(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	getDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	create(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	update(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}
