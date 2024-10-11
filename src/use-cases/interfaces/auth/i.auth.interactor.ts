import { LoginProps } from './i.auth';

export interface IAuthInteractor {
	login(args: LoginProps): Promise<any | undefined>;
	keepLogin(): Promise<any | undefined>;
}
