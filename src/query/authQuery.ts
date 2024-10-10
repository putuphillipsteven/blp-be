import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export interface UserLogin {
	email: string;
	password: string;
}

export class AuthQuery {
	prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	public async findUserEmail(email: string) {
		const user = this.prisma.user.findUnique({
			where: {
				email,
			},
		});
		return user;
	}
}
