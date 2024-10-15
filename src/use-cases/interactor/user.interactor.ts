import { UserRepository } from '../../adapters/repositories/user.repository';
import { User } from '../../entities/user';
import { CreateUserProps, GetUserProps, ReturnUserProps, UserUseCases } from '../interfaces/user';

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
	create(args: CreateUserProps): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
	update(args: any): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
	delete(args: any): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
}
