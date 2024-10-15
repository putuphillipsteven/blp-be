import { NextFunction, Request, Response } from 'express';
import { User } from '../../entities/user';

export type ReturnUserProps = Omit<
	User,
	'password' | 'created_at' | 'deleted_at' | 'updated_at' | 'gender_id'
>;

export interface UserUseCases {
	get(args: GetUserProps): Promise<ReturnUserProps[] | undefined>;
	create(args: CreateUserProps): Promise<ReturnUserProps | undefined>;
	update(args: any): Promise<ReturnUserProps | undefined>;
	delete(args: any): Promise<ReturnUserProps | undefined>;
}

export interface IUserController {
	get(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	create(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	update(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}

export interface GetUserProps {
	name: string;
	phone_number: string;
	role_id: number;
	page: number;
	page_size: number;
}

export interface CreateUserProps extends User {}

export type UpdateUserProps = Omit<User, 'email' | 'password'>;
