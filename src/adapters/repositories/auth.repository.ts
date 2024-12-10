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

			if (!isUserExist) {
				throw new Error('Sorry, email doesnt exist');
			}

			const isPasswordValid = await bcrypt.compare(password, isUserExist.password || '');

			if (!isPasswordValid) {
				throw new Error('Wrong password');
			}

			const accessTokenExpiredInMS = Number(process.env.ACCESS_TOKEN_EXPIRED_IN_MS);

			const refreshTokenExpiredInMS = Number(process.env.REFRESH_TOKEN_EXPIRED_IN_MS);


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

			const accessToken = jwt.sign(payload, jwtSecretKey, {
				expiresIn: accessTokenExpiredInMS,
			});

			const refreshToken = jwt.sign(refreshTokenPayload, jwtSecretKey, {
				expiresIn: refreshTokenExpiredInMS,
			});

			const verifyAccessToken : string | CustomJWTPayload | any = jwt.verify(accessToken,jwtSecretKey);
			const verifyRefreshToken : string | CustomJWTPayload | any =jwt.verify(refreshToken,jwtSecretKey);

			console.log("verifyAccessToken : ", new Date(verifyAccessToken.exp * 1000).toLocaleString());
			console.log("verifyRefreshToken : ", new Date(verifyRefreshToken.exp * 1000).toLocaleString());

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

			if(verifyRefreshToken) {
				return { user: verifyRefreshToken };
			}
		} catch (error) {
			throw error;
		}
	}
}
