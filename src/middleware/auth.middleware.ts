import { NextFunction,  Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {
	VerifyTokenWithUserProps
} from '../use-cases/interfaces/auth.interface';

export interface CustomJWTPayload extends JwtPayload {
	id: number,
	email: string,
	role_id: number,
}

export class AuthMiddleware {
	public static verifyToken(req: VerifyTokenWithUserProps,
							  res: Response,
							  next: NextFunction,): any {
		try {
			let token = req.headers.authorization;

			if (!token) return res.status(401).send({ message: 'Access Denied' });

			token = token.split(' ')[1];

			if (token === 'null' || !token) {
				return res.status(401).send({message: 'Unauthorized Token'});
			}

			const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY || '');

			req.user = verifiedUser;

			const accessTokenExpiredAt = req.user.exp;

			const getTimeAccessTokenExpiredAt = accessTokenExpiredAt * 1000;

			const getTimeNow = new Date(Date.now()).getTime();

			if(getTimeAccessTokenExpiredAt < getTimeNow) {
				return res.status(401).send({ message: 'Expired Token' });
			}

			next();
		} catch (error: any) {
			return res.status(500).send({ message: 'Internal Server Error' });
		}
	}

	public static isManager(req: VerifyTokenWithUserProps,
							res: Response,
							next: NextFunction):any {
		try {
			const ROLE_ID = req.user.role_id;

			if (ROLE_ID === 1) {
				next();
			} else {
				return res.status(401).send({message: 'Sorry you dont have access to this'});
			}
		} catch (error) {
			return res.status(500).send({message: 'Internal server error'});
		}
	}

	public static isEmployeeOrManager(req: VerifyTokenWithUserProps,
									  res: Response,
									  next: NextFunction): any {
		try {
			const ROLE_ID = req.user.role_id;

			if (ROLE_ID === 1 || ROLE_ID === 2) {
				next();
			} else {
				return res.status(401).send({ message: 'Sorry you dont have access to this' });
			}
		} catch (error) {
			console.error(error)
			return res.status(500).send({ message: 'Internal server error' });
		}
	}
}
