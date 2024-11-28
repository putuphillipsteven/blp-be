import { UserRepository } from '../../adapters/repositories/user';
import { User } from '@prisma/client';
import {
	CreateUserProps,
	GetUserDetailsProps,
	GetUserProps, ReturnUserDTO,
	UpdateUserProps,
	UserUseCases,
} from '../interfaces/user';

export class UserInteractor implements UserUseCases {
	private repository: UserRepository;
	constructor(repository: UserRepository) {
		this.repository = repository;
	}

	async getUserDetails(args: GetUserDetailsProps): Promise<any | null> {
		try {
			const res = await this.repository.getUserDetails(args);
			return res;
		} catch (error) {
			throw error;
		}
	}

	async createUserWithGoogle(args: CreateUserProps): Promise<any | undefined> {
		try {
			const res = await this.repository.createUserWithGoogle(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async getUsers(args: GetUserProps): Promise<ReturnUserDTO | undefined> {
		try {
			const res = await this.repository.getUsers(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async createUser(args: CreateUserProps): Promise<User | undefined> {
		try {
			const res = await this.repository.createUser(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async updateUser(args: UpdateUserProps): Promise<User | undefined> {
		try {
			const res = await this.repository.updateUser(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async deleteUser(args: any): Promise<void> {
		try {
			const res = await this.repository.deleteUser(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
