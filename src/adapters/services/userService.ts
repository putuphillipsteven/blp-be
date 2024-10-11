import { AuthQuery } from '../queries/authQuery';
import { User, UserQuery } from '../queries/userQuery';
import { exclude } from '../../utils/excludePassword';

export class UserService {
	private userQuery: UserQuery;
	constructor() {
		this.userQuery = new UserQuery();
	}

	public async createUser(user: User) {
		try {
			const auth = new AuthQuery();
			const check = await auth.findUserEmail(user.email);

			if (check) throw new Error('Email is already registered');
			const res = await this.userQuery.createUser(user);
			return exclude(res, ['password']);
		} catch (err) {
			throw err;
		}
	}
}
