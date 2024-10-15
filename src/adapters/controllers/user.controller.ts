import { Request, Response, NextFunction } from 'express';
import { GetUserProps, IUserController } from '../../use-cases/interfaces/user';
import { UserInteractor } from '../../use-cases/interactor/user.interactor';
import { sendResponse } from '../../utils/utilts';
import { ParsedQs } from 'qs';
import bcrypt from 'bcrypt';

export class UserController implements IUserController {
	private interactor: UserInteractor;
	constructor(interactor: UserInteractor) {
		this.interactor = interactor;
	}
	async get(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { name, phone_number, role_id, page, page_size } = req.query as ParsedQs & GetUserProps;
			const args: GetUserProps = {
				name,
				phone_number,
				role_id: Number(role_id),
				page: Number(page),
				page_size: Number(page_size),
			};
			const data = await this.interactor.get(args);
			return sendResponse(res, 200, 'Get User Success', data);
		} catch (error) {
			next(error);
		}
	}
	async create(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(req.body.password, salt);
			const result = await this.interactor.create({ ...req.body, password: hashPassword });
			return sendResponse(res, 200, 'Create User Success', result);
		} catch (error) {
			next(error);
		}
	}
	update(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		throw new Error('Method not implemented.');
	}
	delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		throw new Error('Method not implemented.');
	}
}
