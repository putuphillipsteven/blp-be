import { NextFunction, Request, Response } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {
	RefreshTokenProps,
	RefreshTokenWithUserProps,
	VerifyTokenWithUserProps
} from '../use-cases/interfaces/auth.interface';
import {ResponseHandler} from "../utils/response-handler";


export const verifyToken: any = (
	req: VerifyTokenWithUserProps,
	res: Response,
	next: NextFunction,
) => {
	try {
		let token = req.headers.authorization;

		if (!token) return res.status(500).send({ message: 'Access Denied' });

		token = token.split(' ')[1];

		if (token === 'null' || !token) return res.status(500).send({ message: 'Unauthorized Token' });

		const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY || '');

		req.user = verifiedUser;

		const accessTokenExpiredAt = req.user.accessTokenExpiredAt;

		const getTimeAccessTokenExpiredAt = new Date(accessTokenExpiredAt).getTime();

		const getTimeNow = new Date(Date.now()).getTime();

		if(getTimeAccessTokenExpiredAt < getTimeNow) {
			return res.status(401).send({ message: 'Expired Token' });
		}

		next();
	} catch (error: any) {
		console.error("Error verifying token: ", error.expiredAt);
			return res.status(500).send({ message: 'Invalid Token' });
	}
};

interface CustomJWTPayload extends JwtPayload {
	id: number,
	email: string,
	role_id: number,
}

export const verifyRefreshToken: boolean | any = (req: RefreshTokenWithUserProps, res: Response, next: NextFunction) => {
	try {
		const {email, refreshToken} = req.body;

		// const accessTokenExpiredAt = req.user.accessTokenExpiredAt;
		//
		// const getTimeAccessTokenExpiredAt = new Date(accessTokenExpiredAt).getTime();
		//
		// const getTimeNow = new Date(Date.now()).getTime();
		//
		// if(getTimeAccessTokenExpiredAt < getTimeNow) {
		// 	return res.status(401).send({ message: 'Expired Token' });
		// }

		const verifyUser: string | CustomJWTPayload | any= jwt.verify(refreshToken ,  process.env.JWT_SECRET_KEY || '')

		console.log("Verify User: ", verifyUser)

		if(verifyUser) {
			return res.status(200).send({ user: verifyUser });
		}
		return ResponseHandler.generateResponse(res, 200);
	} catch (error) {
		return false;
	}
}

export const checkRoleEmployeeOrManager: any = (
	req: VerifyTokenWithUserProps,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ROLE_ID = req.user.role_id;

		console.log("CHECK ROLE REQ.USER: ", req .user);

		if (ROLE_ID === 1 || ROLE_ID === 2) {
			next();
		} else {
			return res.status(500).send({ message: 'Sorry you dont have access to this' });
		}
	} catch (error) {
		return res.status(500).send({ message: 'Sorry you dont have access to this' });
	}
};
