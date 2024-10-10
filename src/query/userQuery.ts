import { PrismaClient } from '@prisma/client';

export interface User {
	first_name: string;
	last_name: string;
	address?: string | null;
	email: string;
	password: string;
	role_id: 1 | 2 | 3;
	gender_id: 1 | 2;
	branch_id?: number | null;
	avatar?: string | null;
}

export class UserQuery {
	prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	public async createUser(user: User) {
		try {
			const res = await this.prisma.user.create({ data: { ...user } });
			return res;
		} catch (err) {
			throw err;
		}
	}
}
