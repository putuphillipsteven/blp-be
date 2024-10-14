import { AuthRepository } from '../../adapters/repositories/auth.repository';
import {
	AuthUseCases,
	LoginProps,
	LoginReturnProps,
	LoginReturnUserProps,
} from '../interfaces/i.auth';

export class AuthInteractor implements AuthUseCases {
	private repository: AuthRepository;

	constructor(repository: AuthRepository) {
		this.repository = repository;
	}

	async login(args: LoginProps): Promise<LoginReturnProps | undefined> {
		try {
			const res = await this.repository.login(args);
			return res;
		} catch (error) {
			throw error;
		}
	}
}
