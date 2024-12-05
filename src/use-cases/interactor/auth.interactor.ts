import { AuthRepository } from '../../adapters/repositories/auth.repository';
import {
	AuthUseCases,
	KeepLoginProps,
	LoginProps,
	LoginReturnProps,
	RefreshTokenProps,
} from '../interfaces/auth.interface';

export class AuthInteractor implements AuthUseCases {
	private repository: AuthRepository;

	constructor(repository: AuthRepository) {
		this.repository = repository;
	}


	async googleLogin(): Promise<any | undefined> {
		throw new Error('Method not implemented.');
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

	async refreshToken(args: RefreshTokenProps): Promise<any> {
			try {
				const res = await this.repository.refreshToken(args);
				return res;
			} catch (error) {
				throw error;
			}
	}
}
