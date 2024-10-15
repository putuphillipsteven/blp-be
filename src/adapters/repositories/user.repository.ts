import { PrismaClient } from '@prisma/client';
import { User } from '../../entities/user';
import {
	CreateUserProps,
	GetUserProps,
	ReturnUserProps,
	UserUseCases,
} from '../../use-cases/interfaces/user';

export class UserRepository implements UserUseCases {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	async get(args: GetUserProps): Promise<ReturnUserProps[] | undefined> {
		try {
			const { name, phone_number, role_id }: GetUserProps = args;

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
				where: where,
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
	create(args: CreateUserProps): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
	update(args: any): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
	delete(args: any): Promise<User | undefined> {
		throw new Error('Method not implemented.');
	}
}
