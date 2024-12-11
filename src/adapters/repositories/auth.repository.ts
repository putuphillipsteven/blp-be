import { PrismaClient } from '@prisma/client';
import {AuthUseCases, KeepLoginProps, LoginProps, RefreshTokenProps} from '../../use-cases/interfaces/auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserRepository} from "./user.repository";
import {CustomJWTPayload} from "../../middleware/auth.middleware";
import dotenv from "dotenv";
import path from "path";
dotenv.config({
	path: path.resolve(__dirname, '../.env'),
});

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

			const res = await this.userRepository.getUserDetails({id});

			return {
				user: res
			};
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

			if (!isUserExist) {
				throw new Error('Sorry, email doesnt exist');
			}

			const isPasswordValid = await bcrypt.compare(password, isUserExist.password || '');

			if (!isPasswordValid) {
				throw new Error('Wrong password');
			}

			const payload = {
				id: isUserExist.id,
				email: isUserExist.email,
				role_id: isUserExist.role_id,
			};

			const refreshTokenPayload = {
				id: isUserExist.id,
				email: isUserExist.email,
				role_id: isUserExist.role_id,
			}

			if (!process.env.JWT_SECRET_KEY) {
				throw new Error('JWT_SECRET_KEY is not defined in environment variables');
			}

			const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
				expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRED_IN_MS),
			});

			const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET_KEY, {
				expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRED_IN_MS),
			});

			const userWithoutPassword = await this.userRepository.getUserByEmail(email);


			return { user: userWithoutPassword, accessToken, refreshToken };
		} catch (error) {
			throw error;
		}
	}

	async refreshToken(args: RefreshTokenProps): Promise<any> {
		try {
			const {email, refreshToken} = args;

			const verifyRefreshToken: string | CustomJWTPayload | any = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY || '');

			const newAccessToken = jwt.sign({email}, process.env.JWT_SECRET_KEY || "", {
				expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRED_IN_MS),
			})
			const newRefreshAccessToken = jwt.sign({email}, process.env.JWT_SECRET_KEY || "", {
				expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRED_IN_MS),
			})

			if(verifyRefreshToken) {
				return { accessToken: newAccessToken, refreshToken: newRefreshAccessToken };
			}
		} catch (error) {
			throw error;
		}
	}
}
