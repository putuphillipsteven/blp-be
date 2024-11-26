import { PrismaClient, Transaction } from '@prisma/client';

import {
	CreateTransactionWithDetailsProps,
	GetTransactionFilters,
	GetTransactionReturnProps,
	TransactionUseCases,
	UpdateTransactionProps,
} from '../../use-cases/interfaces/transaction';

export class TransactionRepository implements TransactionUseCases {
	private prisma: PrismaClient;
	constructor() {
		this.prisma = new PrismaClient();
	}

	async update(args: UpdateTransactionProps): Promise<Transaction | undefined> {
		try {
			const argsToUpdate: any = {};

			const {
				details,
				booking_id,
				cashier_id,
				google_drive_link,
				payment_method_id,
				status_id,
				user_id,
				id,
				customer_name,
			}: UpdateTransactionProps = args;

			if (booking_id) argsToUpdate.booking_id = booking_id;
			if (cashier_id) argsToUpdate.cashier_id = cashier_id;
			if (status_id) argsToUpdate.status_id = status_id;
			if (user_id) argsToUpdate.user_id = user_id;
			if (google_drive_link) argsToUpdate.google_drive_link = google_drive_link;
			if (payment_method_id) argsToUpdate.payment_method_id = payment_method_id;
			if (details) argsToUpdate.details = details;
			if (customer_name) argsToUpdate.customer_name = customer_name;

			const res = await this.prisma.transaction.update({
				where: {
					id,
				},
				data: {
					...argsToUpdate,
				},
			});
			return res;
		} catch (error) {
			throw error;
		}
	}
	delete(): Promise<Transaction | undefined> {
		throw new Error('Method not implemented.');
	}

	async get(args: GetTransactionFilters): Promise<GetTransactionReturnProps | undefined> {
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
							first_name: true,
							last_name: true,
							password: false,
							email: true,
							gender: {
								select: { gender_name: true },
							},
						},
					},
					cashier: {
						select: {
							first_name: true,
							last_name: true,
							password: false,
							email: true,
							gender: {
								select: { gender_name: true },
							},
						},
					},
					payment_method: true,
					transaction_detail: true,
					status: true,
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
				orderBy: {
					created_at: 'desc',
				},
			});
			return {
				total,
				data,
			};
		} catch (error) {
			throw error;
		}
	}

	async create(args: CreateTransactionWithDetailsProps): Promise<Transaction | undefined> {
		try {
			// Destructuring objects, separate the details, with the transaction data
			const { details, ...transactionData } = args;

			const userId = transactionData.user_id;

			const customer = await this.prisma.user.findFirst({
				where: {
					id: userId,
				},
				select: {
					first_name: true,
					last_name: true,
				},
			});

			let customerFullName = 'Customer';

			if (customer) {
				customerFullName = customer.first_name + ' ' + customer.last_name;
			}

			let totalPrice = 0;
			let totalQty = 0;
			let detailsData: any = [];

			for (let product of details) {
				const productId = product.product_id;
				const qty = product.qty;
				const checkProduct = await this.prisma.product.findFirst({
					where: {
						id: productId,
					},
				});
				if (checkProduct) {
					totalPrice += checkProduct.product_price * qty;
					totalQty += qty;
					detailsData.push({
						product_id: product.product_id,
						qty: product.qty,
						total_price: checkProduct.product_price * qty,
					});
				} else {
					throw new Error('Product Not Found');
				}
			}

			if (transactionData.payment_amount < totalPrice) {
				throw new Error('Under Payment');
			}

			const createTransaction = await this.prisma.transaction.create({
				data: {
					...transactionData,
					customer_name: customerFullName,
					payment_amount: transactionData.payment_amount,
					payment_change: transactionData.payment_amount - totalPrice,
					total_price: totalPrice,
					total_price_ppn: totalPrice + totalPrice * 0.1,
					total_qty: totalQty,
				},
			});

			const transaction_id = createTransaction?.id;

			// Mapp the details data, but add transaction_id properties to the object
			const newDetailsData = detailsData.map((detail: any) => {
				return {
					...detail,
					transaction_id,
				};
			});

			await this.prisma.transaction_Detail.createMany({
				data: newDetailsData,
			});

			return createTransaction;
		} catch (error) {
			throw error;
		}
	}
}
