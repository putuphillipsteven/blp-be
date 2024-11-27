import { Request, Response, NextFunction } from 'express';
import {
	GetUserDetailsProps,
	GetUserProps,
	IUserController,
	UpdateUserProps,
} from '../../use-cases/interfaces/user';
import { UserInteractor } from '../../use-cases/interactor/user';
import { sendResponse } from '../../utils/utilts';
import { ParsedQs } from 'qs';
import bcrypt from 'bcrypt';
import {ResponseHandler} from "../../utils/response-handler";
import {PaginationDTO} from "../../utils/dto/paginationdto";

export class UserController implements IUserController {
	private interactor: UserInteractor;
	constructor(interactor: UserInteractor) {
		this.interactor = interactor;
	}

	async getDetails(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;
			const args: GetUserDetailsProps = {
				id: Number(id),
			};
			const result = await this.interactor.getDetails(args);

			return ResponseHandler.generateResponse(res, 200, result);
		} catch (error) {
			next(error);
		}
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

			const users = data?.data;

			const totalPages = data?.total_pages;

			const totalDatum = data?.total_datum;

			const currentPage = data?.current_page;

			const paginationDTO = new PaginationDTO(totalDatum, currentPage, totalPages);

			return  ResponseHandler.generateResponse(res, 200, users, paginationDTO);
		}
		catch (error) {
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
	async update(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;
			const avatar_url = req?.file?.filename;
			const data = await this.interactor.update({ ...req.body, id: Number(id), avatar_url });
			return sendResponse(res, 200, 'Update User Success', data);
		} catch (error) {
			next(error);
		}
	}
	async delete(req: Request, res: Response, next: NextFunction): Promise<any | undefined> {
		try {
			const { id } = req.params;
			const args = { id: Number(id) };
			const data = await this.interactor.delete(args);
			return sendResponse(res, 200, 'Delete User Success', data);
		} catch (error) {
			next(error);
		}
	}
}
