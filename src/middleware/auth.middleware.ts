import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface IVerifyTokenReq extends Request {
	user: any;
}
export const verifyToken: any = (req: IVerifyTokenReq, res: Response, next: NextFunction) => {
	try {
		let token = req.headers.authorization;

		if (!token) return res.status(500).send('Access Denied');

		token = token.split(' ')[1];

		if (token === 'null' || !token) return res.status(500).send('Unauthorized Token');

		const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY || '');

		req.user = verifiedUser;
		next();
	} catch (error) {
		return res.status(500).send('Invalid Token');
	}
};

export const checkRoleEmployee: any = (req: IVerifyTokenReq, res: Response, next: NextFunction) => {
	try {
		if (req.user.roleId == 2) {
			next();
		} else {
			return res.status(500).send('Unauthorized');
		}
	} catch (error) {
		return res.status(500).send('Unauthorized');
	}
};
