import { PrismaClient } from '@prisma/client';
import { AuthUseCases, LoginProps } from '../../use-cases/interfaces/i.auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { exclude } from '../../utils/excludePassword';

export class AuthRepository implements AuthUseCases {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async login(args: LoginProps): Promise<any | undefined> {
		try {
			const { email, password } = args;
			const isUserExist = await this.prisma.user.findUnique({
				where: { email },
			});
			if (!isUserExist) throw new Error('Sorry, email doesnt exist');
			const isValid = await bcrypt.compare(password, isUserExist.password || '');

			if (!isValid) throw new Error('Wrong password');
			let payload = {
				id: isUserExist.id,
				email: isUserExist.email,
				roleId: isUserExist.role_id,
			};
			const jwtSecretKey = process.env.JWT_SECRET_KEY;
			if (!jwtSecretKey) {
				throw new Error('JWT_SECRET_KEY is not defined in environment variables');
			}
			const token = jwt.sign(payload, jwtSecretKey, {
				expiresIn: '1h',
			});
			return { user: exclude(isUserExist, ['password']), token };
		} catch (error) {
			throw error;
		}
	}
}
