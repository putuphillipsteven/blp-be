import { PrismaClient } from '@prisma/client';
import {
	CreateUserProps,
	GetUserDetailsProps,
	GetUserProps, ReturnUserDTO,
	UpdateUserProps,
	UserDetailsReturnProps, UserDTO,
	UserUseCases,
} from '../../use-cases/interfaces/user';
import { exclude } from '../../utils/exclude-password';

export class UserRepository implements UserUseCases {
	private prisma: PrismaClient;

	private whereFilter: any;

	constructor() {
		this.prisma = new PrismaClient();
		this.whereFilter = {};
	}

	setWhereFilterForNameAndPhoneNumber(name: String, phone_number: String) {
		this.whereFilter.AND = [
			{
				full_name: {
					contains: name,
				}
			},
			{
				phone_number: {
					contains: phone_number,
				},
			},
		];
	}

	setWhereFilterForName(name: String) {
		this.whereFilter.full_name = {
			contains: name,
		}
	}

	setWhereFilterForPhoneNumber(phone_number: String) {
		this.whereFilter.phone_number = {
			contains: phone_number,
		};
	}

	async getUserDetails(args: GetUserDetailsProps): Promise<UserDetailsReturnProps | any | null> {
		try {
			const { id } = args;

			const res = await this.prisma.user.findFirst({
				where: {
					id,
				},
			});

			if (res) {
				return exclude(res, ['password']);
			} else {
				throw new Error('User Not Found');
			}
		} catch (error) {
			throw error;
		}
	}

	async createUserWithGoogle(args: CreateUserProps): Promise<any | undefined> {
		try {
			const res = await this.prisma.user.create({
				data: args,
			});
			return res;
		} catch (error) {
			throw error;
		}
	}

	async getUsers(args: GetUserProps): Promise<ReturnUserDTO | undefined> {
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

			this.whereFilter = { ...roles };

			if (name && phone_number) {
				this.setWhereFilterForNameAndPhoneNumber(name, phone_number);
			} else if (name) {
				this.setWhereFilterForName(name);
			} else if (phone_number) {
				this.setWhereFilterForPhoneNumber(phone_number);
			}


			const users: UserDTO[] = await this.prisma.user.findMany({
				skip,
				take,
				where: this.whereFilter,
				orderBy: {
					first_name: 'asc',
				},
				select: {
					id: true,
					first_name: true,
					last_name: true,
					full_name: true,
					phone_number: true,
					second_phone_number: true,
					role_id: true,
					is_verified: true,
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

			const totalDatum = await  this.prisma.user.count({where: this.whereFilter});

			const totalPages = Math.ceil(totalDatum / page_size);

			const currentPage = page;

			return {
				total_datum: totalDatum,
				total_pages: totalPages,
				current_page: currentPage,
				data: users
			};
		} catch (error) {
			throw error;
		}
	}

	async createUser(args: CreateUserProps): Promise<any | undefined> {
		try {
			const { email, phone_number, first_name, last_name }: CreateUserProps = args;

			const checkEmail = await this.prisma.user.findFirst({
				where: {
					email,
				},
			});

			if (checkEmail) throw new Error('Email is already registered');

			const checkPhoneNumber = await this.prisma.user.findFirst({
				where: {
					phone_number,
				},
			});

			if (checkPhoneNumber) throw new Error('Phone number is already registered');

			const fullName = first_name + ' ' + (last_name ? last_name : '');

			const res = await this.prisma.user.create({ data: { ...args, full_name: fullName.trim() } });

			return exclude(res, ['password']);
		} catch (error) {
			throw error;
		}
	}

	async updateUser(args: UpdateUserProps): Promise<any | undefined> {
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

	async deleteUser(args: any): Promise<any | undefined> {
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
