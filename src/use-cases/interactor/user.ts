import { UserRepository } from '../../adapters/repositories/user';
import { User } from '../../entities/user';
import {
	CreateUserProps,
	GetUserProps,
	ReturnUserProps,
	UpdateUserProps,
	UserUseCases,
} from '../interfaces/user';

export class UserInteractor implements UserUseCases {
	private repository: UserRepository;
	constructor(repository: UserRepository) {
		this.repository = repository;
	}
	async get(args: GetUserProps): Promise<ReturnUserProps[] | undefined> {
		try {
			const res = await this.repository.get(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async create(args: CreateUserProps): Promise<User | undefined> {
		try {
			const res = await this.repository.create(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async update(args: UpdateUserProps): Promise<User | undefined> {
		try {
			const res = await this.repository.update(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
	async delete(args: any): Promise<User | undefined> {
		try {
			const res = await this.repository.delete(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
