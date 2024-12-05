import { PrismaClient } from '@prisma/client';
import {AuthUseCases, KeepLoginProps, LoginProps, RefreshTokenProps} from '../../use-cases/interfaces/auth.interface';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserRepository} from "./user.repository";
import {ResponseHandler} from "../../utils/response-handler";
import {CustomJWTPayload} from "../../middleware/auth.middleware";

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

			if (!isUserExist) throw new Error('Sorry, email doesnt exist');

			const isPasswordValid = await bcrypt.compare(password, isUserExist.password || '');

			if (!isPasswordValid) throw new Error('Wrong password');

			const accessTokenExpiredInMS = 1800000;

			const refreshTokenExpiredInMS = accessTokenExpiredInMS * 10;

			const payload = {
				id: isUserExist.id,
				email: isUserExist.email,
				role_id: isUserExist.role_id,
				accessTokenExpiredInMS,
				accessTokenExpiredAt: new Date(Date.now() + accessTokenExpiredInMS)
			};

			const refreshTokenPayload = {
				email: isUserExist.email,
				role_id: isUserExist.role_id,
				refreshTokenExpiredInMS,
				refreshTokenExpiredAt: new Date(Date.now() + refreshTokenExpiredInMS)
			}

			const jwtSecretKey = process.env.JWT_SECRET_KEY;

			if (!jwtSecretKey) {
				throw new Error('JWT_SECRET_KEY is not defined in environment variables');
			}

			const token = jwt.sign(payload, jwtSecretKey, {
				expiresIn: accessTokenExpiredInMS,
			});

			const refreshToken = jwt.sign(refreshTokenPayload, jwtSecretKey, {
				expiresIn: refreshTokenExpiredInMS,
			});

			const userWithoutPassword = await this.userRepository.getUserByEmail(email);

			const accessTokenExpiredAt = new Date(Date.now() + accessTokenExpiredInMS).toLocaleString();

			return { user: userWithoutPassword, token, refreshToken, accessTokenExpiredAt };
		} catch (error) {
			throw error;
		}
	}

	async refreshToken(args: RefreshTokenProps): Promise<any> {
		try {
			const {email, refreshToken} = args;

			// const accessTokenExpiredAt = req.user.accessTokenExpiredAt;
			//
			// const getTimeAccessTokenExpiredAt = new Date(accessTokenExpiredAt).getTime();
			//
			// const getTimeNow = new Date(Date.now()).getTime();
			//
			// if(getTimeAccessTokenExpiredAt < getTimeNow) {
			// 	return res.status(401).send({ message: 'Expired Token' });
			// }

			const verifyUser: string | CustomJWTPayload | any= jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJkZWZhdWx0ZW1wbG95ZWVAZ21haWwuY29tIiwicm9sZV9pZCI6MiwiYWNjZXNzVG9rZW5FeHBpcmVkSW5NUyI6MTgwMDAwMCwiYWNjZXNzVG9rZW5FeHBpcmVkQXQiOiIyMDI0LTEyLTA1VDE2OjU3OjAzLjQyMVoiLCJpYXQiOjE3MzM0MTYwMjMsImV4cCI6MTczNTIxNjAyM30.VU2en3Of_wMr516DEJPUmHnx4G7cOfQOk-4gMoo-ofY" ,  process.env.JWT_SECRET_KEY || '');

			const verifyRefreshToken: string | CustomJWTPayload | any = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY || '');

			console.log("Verify User: ", verifyUser);

			console.log("Verify Refresh Token: ", verifyRefreshToken);

			if(verifyUser) {
				return { user: verifyUser };
			}
		} catch (error) {
			throw error;
		}
	}
}
