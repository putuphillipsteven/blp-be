import { PrismaClient } from '@prisma/client';
import {
	CreateUserProps,
	GetUserDetailsProps,
	GetUserProps, ReturnUserDTO,
	UpdateUserProps,
	UserDetailsReturnProps, UserDTO,
	UserUseCases,
} from '../../use-cases/interfaces/user.interface';
import {PaginationDto} from "../../utils/dto/pagination.dto";

export class UserRepository implements UserUseCases {
	private prisma: PrismaClient;

	private whereFilter: any;

	private selectFilter  = {
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
	};

	constructor() {
		this.prisma = new PrismaClient();
		this.whereFilter = {};
	}

	setWhereFilter(role_id: number, name: String, phone_number: String) {
		this.whereFilter.AND = [
			role_id ? {role_id:{
				equals: role_id
			}} : {},
			name ? {full_name: {
				contains: name,
			}} : {},
			phone_number ? {phone_number: {
					contains: phone_number,
				}} : {},
		]
	}


	async getUserDetails(args: GetUserDetailsProps): Promise<UserDetailsReturnProps | null> {
		try {
			const { id } = args;

			const res = await this.prisma.user.findFirst({
				where: {
					id
				},
				select: this.selectFilter,
			});

			if (res) {
				return res;
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

			this.setWhereFilter(role_id, name, phone_number);

			const users: UserDTO[] = await this.prisma.user.findMany({
				skip,
				take,
				where: this.whereFilter,
				orderBy: {
					first_name: 'asc',
				},
				select: this.selectFilter
			});

			const totalDatum = await  this.prisma.user.count({where: this.whereFilter});

			const totalPages = Math.ceil(totalDatum / page_size);

			const currentPage = page;

			const paginationDTO = new PaginationDto(totalDatum, totalPages, currentPage);

			return {
				pagination: paginationDTO,
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

			const role_id = args.role_id ? args.role_id : 3;

			const res = await this.prisma.user.create({ data: { ...args, full_name: fullName.trim(), role_id} });

			const userId = res.id;

			const user = await this.getUserDetails({id: userId});

			return user;
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

			await this.prisma.user.update({ where: { id }, data: argsToUpdate });

			const user = await this.getUserDetails({id});
			return user;
		} catch (error) {
			throw error;
		}
	}

	async deleteUser(args: any): Promise<any | undefined> {
		try {
			const { id } = args;

			await this.prisma.user.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
