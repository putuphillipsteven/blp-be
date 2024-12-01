import { PrismaClient } from '@prisma/client';
import { AuthUseCases, KeepLoginProps, LoginProps } from '../../use-cases/interfaces/auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserRepository} from "./user.repository";

export class AuthRepository implements AuthUseCases {
	private prisma: PrismaClient;
	private userRepository: UserRepository;
	constructor() {
		this.prisma = new PrismaClient();
		this.userRepository = new UserRepository()
	}

	async googleLogin(): Promise<any | undefined> {
		try {
		} catch (error) {
			throw error;
		}
	}
	async keepLogin(args: KeepLoginProps): Promise<any | undefined> {
		try {
			const { id } = args;
			const res = await this.prisma.user.findFirst({
				where: {
					id,
				},
			});

			return res;
		} catch (error) {
			throw error;
		}
	}
	async login(args: LoginProps): Promise<any | undefined> {
		try {
			const { email, password } = args;

			const isUserExist = await this.prisma.user.findUnique({
				where: { email },
			});

			if (!isUserExist) throw new Error('Sorry, email doesnt exist');

			const isPasswordValid = await bcrypt.compare(password, isUserExist.password || '');

			if (!isPasswordValid) throw new Error('Wrong password');

			const payload = {
				id: isUserExist.id,
				email: isUserExist.email,
				role_id: isUserExist.role_id,
			};

			const jwtSecretKey = process.env.JWT_SECRET_KEY;

			if (!jwtSecretKey) {
				throw new Error('JWT_SECRET_KEY is not defined in environment variables');
			}

			const token = jwt.sign(payload, jwtSecretKey, {
				expiresIn: '1h',
			});

			const refreshToken = jwt.sign(payload, jwtSecretKey, {
				expiresIn: '30d',
			});

			const userWithoutPassword = await this.userRepository.getUserByEmail(email);

			return { user: userWithoutPassword, token, refreshToken };
		} catch (error) {
			throw error;
		}
	}
}