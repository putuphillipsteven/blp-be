import { Request, Response, NextFunction } from 'express';
import {
	GetUserDetailsProps,
	GetUserProps,
	IUserController,
} from '../../use-cases/interfaces/user.interface';
import { UserInteractor } from '../../use-cases/interactor/user.interactor';
import { ParsedQs } from 'qs';
import bcrypt from 'bcrypt';
import {ResponseHandler} from "../../utils/response-handler";
import {PaginationDto} from "../../utils/dto/pagination.dto";

export class UserController implements IUserController {
	private userInteractor: UserInteractor;
	constructor(userInteractor: UserInteractor) {
		this.userInteractor = userInteractor;
	}

	async getUserDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;

			const args: GetUserDetailsProps = {
				id: Number(id),
			};

			const user = await this.userInteractor.getUserDetails(args);

			return ResponseHandler.generateResponse(res, 200, user);
		} catch (error) {
			next(error);
		}
	}

	async getUsers(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { name, phone_number, role_id, page, page_size } = req.query as ParsedQs & GetUserProps;

			const args: GetUserProps = {
				name,
				phone_number,
				role_id: Number(role_id),
				page: Number(page),
				page_size: Number(page_size),
			};

			const data = await this.userInteractor.getUsers(args);

			const users = data?.data;

			const pagination = data?.pagination;

			return  ResponseHandler.generateResponse(res, 200, users, pagination);
	}
		catch (error) {
			next(error);
		}
	}

	async createUser(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const salt = await bcrypt.genSalt(10);

			const hashPassword = await bcrypt.hash(req.body.password, salt);

			const user = await this.userInteractor.createUser({ ...req.body, password: hashPassword });

			return ResponseHandler.generateResponse(res, 200, user);
		} catch (error) {
			next(error);
		}
	}

	async updateUser(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;

			const avatar_url = req?.file?.filename;

			const user = await this.userInteractor.updateUser({ ...req.body, id: Number(id), avatar_url });

			return ResponseHandler.generateResponse(res, 200, user);
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;

			const args = { id: Number(id) };

			await this.userInteractor.deleteUser(args);

			return ResponseHandler.generateResponse(res, 200);
		} catch (error) {
			next(error);
		}
	}
}
