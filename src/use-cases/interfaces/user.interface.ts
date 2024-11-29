import { NextFunction, Request, Response } from 'express';
import { User } from '@prisma/client';
import {PaginationDto} from "../../utils/dto/pagination.dto";

export type UserDTO = Omit<
	User,
	'password' | 'created_at' | 'deleted_at' | 'updated_at' | 'gender_id'
>;

export interface ReturnUserDTO  {
	pagination?: PaginationDto;
	data?: UserDTO[] | undefined;
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

export type UserDetailsReturnProps = Omit<User, 'password' | "created_at" | "deleted_at" | "updated_at" | "gender_id">;

export interface GetUserDetailsProps {
	id: number;
}

export interface UserUseCases {
	getUsers(args: GetUserProps): Promise<ReturnUserDTO | undefined>;
	getUserDetails(args: GetUserDetailsProps): Promise<UserDetailsReturnProps | null>;
	createUser(args: CreateUserProps): Promise<UserDTO | undefined>;
	updateUser(args: any): Promise<UserDTO | undefined>;
	deleteUser(args: any): Promise<void>;
	createUserWithGoogle(args: CreateUserProps): Promise<any | undefined>;
}

export interface IUserController {
	getUsers(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	getUserDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	createUser(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	updateUser(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
	deleteUser(req: Request, res: Response, next: NextFunction): Promise<any | undefined>;
}
