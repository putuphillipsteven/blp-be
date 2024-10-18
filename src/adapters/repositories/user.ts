import { PrismaClient } from '@prisma/client';
import { User } from '../../entities/user';
import {
	CreateUserProps,
	GetUserProps,
	ReturnUserProps,
	UpdateUserProps,
	UserUseCases,
} from '../../use-cases/interfaces/user';
import { exclude } from '../../utils/exclude-password';

export class UserRepository implements UserUseCases {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	async get(args: GetUserProps): Promise<ReturnUserProps[] | undefined> {
		try {
			let { name, phone_number, role_id, page, page_size }: GetUserProps = args;
			page = page ? page : 1;
			page_size = page_size ? page_size : 10;

			const skip = (Number(page) - 1) * Number(page_size);
			const take = Number(page_size);
			const roles = {} as any;

			if (role_id) {
				roles.role_id = {
					equals: role_id,
				};
			}

			const where = { ...roles } as any;

			if (name && phone_number) {
				where.AND = [
					{
						OR: [
							{
								first_name: {
									contains: name,
								},
							},
							{
								last_name: {
									contains: name,
								},
							},
						],
					},
					{
						phone_number: {
							contains: phone_number,
						},
					},
				];
			} else if (name) {
				where.OR = [
					{
						first_name: {
							contains: name,
						},
					},
					{
						last_name: {
							contains: name,
						},
					},
				];
			} else if (phone_number) {
				where.phone_number = {
					contains: phone_number,
				};
			}

			const res = await this.prisma.user.findMany({
				skip,
				take,
				where: where,
				orderBy: {
					first_name: 'asc',
				},
				select: {
					id: true,
					first_name: true,
					last_name: true,
					phone_number: true,
					second_phone_number: true,
					role_id: true,
					role: {
						select: {
							id: true,
							name: true,
						},
					},
					avatar_url: true,
					email: true,
					gender: {
						select: {
							id: true,
							gender_name: true,
						},
					},
				},
			});
			return res;
		} catch (error) {
			throw error;
		}
	}
	async create(args: CreateUserProps): Promise<any | undefined> {
		try {
			const { email }: CreateUserProps = args;
			const checkEmail = await this.prisma.user.findFirst({
				where: {
					email,
				},
			});
			if (checkEmail) throw new Error('Email is already registered');
			const res = await this.prisma.user.create({ data: args });
			return exclude(res, ['password']);
		} catch (error) {
			throw error;
		}
	}
	async update(args: UpdateUserProps): Promise<any | undefined> {
		try {
			const argsToUpdate: any = {};
			const {
				id,
				avatar_url,
				first_name,
				last_name,
				phone_number,
				role_id,
				second_phone_number,
				gender_id,
			}: UpdateUserProps = args;

			if (avatar_url) argsToUpdate.avatar_url = avatar_url;
			if (first_name) argsToUpdate.first_name = first_name;
			if (last_name) argsToUpdate.last_name = last_name;
			if (phone_number) argsToUpdate.phone_number = phone_number;
			if (role_id) argsToUpdate.role_id = Number(role_id);
			if (second_phone_number) argsToUpdate.second_phone_number = second_phone_number;
			if (gender_id) argsToUpdate.gender_id = Number(gender_id);

			const res = await this.prisma.user.update({ where: { id }, data: argsToUpdate });
			return exclude(res, ['password']);
		} catch (error) {
			throw error;
		}
	}
	async delete(args: any): Promise<any | undefined> {
		try {
			const { id } = args;
			const res = await this.prisma.user.delete({
				where: {
					id,
				},
			});
			return exclude(res, ['password']);
		} catch (error) {
			throw error;
		}
	}
}
