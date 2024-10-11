import { PrismaClient } from '@prisma/client';

import { Transaction } from '../../entities/transaction';
import { ITransactionRepository } from '../../use-cases/interfaces/transaction/i.transaction.repository';
import {
	CreateTransactionWithDetailsProps,
	GetTransactionFilters,
	GetTransactionReturnProps,
} from '../../use-cases/interfaces/transaction/i.transaction';

export class TransactionRepository implements ITransactionRepository {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}
	updateTransaction(): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}
	deleteTransaction(): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}

	async getTransactions(
		args: GetTransactionFilters,
	): Promise<GetTransactionReturnProps | undefined> {
		try {
			// Define skip and take for pagination
			const skip = (Number(args.page) - 1) * Number(args.pageSize);
			const take = Number(args.pageSize) | 10;

			// Make todays date for default date
			const today = new Date();
			const todayFormatted =
				today.getFullYear() +
				'-' +
				('0' + (today.getMonth() + 1)).slice(-2) +
				'-' +
				('0' + today.getDate()).slice(-2);
			/* 
			Make default start date, if the date is null, so the default
			start date is those, also the default endD date.
			The default end date is + 1 day from default start date
			(todays) date
			*/

			// Define a new filter for more readable
			const where: any = {};
			const newFilter = {
				skip,
				take,
				where,
			};

			// Make readable new include, nothing special
			const newInclude = {
				include: {
					user: {
						select: {
							password: false,
							full_name: true,
							email: true,
							branch: {
								select: { branch_name: true },
							},
							gender: {
								select: { gender_name: true },
							},
						},
					},
					payment_method: true,
					transaction_detail: true,
				},
			};

			// Filter for the total data that we want to return
			const totalFilter = {
				where: {} as any,
			};

			/* 
			Condition if the payment_method_is is given
			*/
			if (args.payment_method_id) {
				newFilter.where.payment_method_id = {
					...newFilter.where.payment_method_id,
					equals: Number(args.payment_method_id),
				};
			}
			/* 
			The condition if the args.start and endDate is given
			*/
			if (args.startDate) {
				newFilter.where.date = { ...newFilter.where.date, gte: new Date(args.startDate) };
				totalFilter.where.date = { ...totalFilter.where.date, gte: new Date(args.startDate) };
			}
			if (args.endDate) {
				newFilter.where.date = { ...newFilter.where.date, lt: new Date(args.endDate) };
				totalFilter.where.date = { ...totalFilter.where.date, lt: new Date(args.endDate) };
			}

			const total = await this.prisma.transaction.count({ ...totalFilter });
			const data = await this.prisma.transaction.findMany({
				...newFilter,
				...newInclude,
			});
			return {
				total,
				data,
			};
		} catch (error) {
			throw error;
		}
	}
	async createTransaction(
		args: CreateTransactionWithDetailsProps,
	): Promise<Transaction | undefined> {
		try {
			// Destructuring objects, separate the details, with the transaction data
			const { details, ...transactionData } = args;
			const createTransaction = await this.prisma.transaction.create({
				data: {
					customer_name: transactionData.customer_name,
					payment_amount: transactionData.payment_amount,
					payment_change: transactionData.payment_amount - transactionData.total_price,
					payment_method_id: transactionData.payment_method_id,
					total_price: transactionData.total_price,
					total_price_ppn: transactionData.total_price + transactionData.total_price * 0.1,
					total_qty: transactionData.total_qty,
					user_id: transactionData.user_id,
				},
			});
			const transaction_id = createTransaction?.id;
			// Mapp the details data, but add transaction_id properties to the object
			const detailsData = details.map((detail) => {
				return {
					...detail,
					transaction_id,
				};
			});
			await this.prisma.transaction_Detail.createMany({
				data: detailsData,
			});
			return createTransaction;
		} catch (error) {
			throw error;
		}
	}
}
