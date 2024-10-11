import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { sendResponse } from '../../utils/utilts';
import { UserService } from '../services/userService';

export class UserController {
	private userService: UserService;
	constructor() {
		this.userService = new UserService();
		this.createUser = this.createUser.bind(this);
	}

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			const result = await this.userService.createUser({ ...req.body, password: hashPassword });
			sendResponse(res, 200, 'Create User Success', result);
		} catch (err) {
			next(err);
		}
	}
}
