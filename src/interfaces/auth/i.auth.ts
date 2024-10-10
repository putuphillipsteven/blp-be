import { User } from '../../entities/user';

export interface CreateUserProps extends User {}

export interface LoginProps {
	email: string;
	password: string;
}
