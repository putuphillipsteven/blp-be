import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { UserLogin } from '../queries/authQuery';
import jwt from 'jsonwebtoken';
import { exclude } from '../../utils/excludePassword';

const prisma = new PrismaClient();

export const loginService = async ({ email, password }: UserLogin) => {
	try {
		const isUserExist = await prisma.user.findUnique({
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
	} catch (err) {
		throw err;
	}
};
