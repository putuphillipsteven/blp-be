import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { VerifyTokenWithUserProps } from '../use-cases/interfaces/auth';

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

		next();
	} catch (error) {
		return res.status(500).send({ message: 'Invalid Token' });
	}
};

export const refreshToken = (req: VerifyTokenWithUserProps, res: Response, next: NextFunction) => {
	try {
	} catch (error) {
		return res.status(500).send({ message: 'Invalid Token' });
	}
};

export const checkRoleEmployeeOrManager: any = (
	req: VerifyTokenWithUserProps,
	res: Response,
	next: NextFunction,
) => {
	try {
		const ROLE_ID = req.user.role_id;

		if (ROLE_ID === 1 || ROLE_ID === 2) {
			next();
		} else {
			return res.status(500).send({ message: 'Sorry you dont have access to this' });
		}
	} catch (error) {
		return res.status(500).send({ message: 'Sorry you dont have access to this' });
	}
};
