import { AuthRepository } from '../../adapters/repositories/auth';
import {
	AuthUseCases,
	KeepLoginProps,
	LoginProps,
	LoginReturnProps,
	LoginReturnUserProps,
} from '../interfaces/auth';

export class AuthInteractor implements AuthUseCases {
	private repository: AuthRepository;

	constructor(repository: AuthRepository) {
		this.repository = repository;
	}
	async keepLogin(args: KeepLoginProps): Promise<any | undefined> {
		try {
			const res = await this.repository.keepLogin(args);
			return res;
		} catch (error) {
			throw error;
		}
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
