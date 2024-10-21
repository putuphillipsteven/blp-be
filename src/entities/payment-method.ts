import { Payment_Method as PaymentMethodPrisma } from '@prisma/client';

export class PaymentMethod implements PaymentMethodPrisma {
	constructor(
		public id: number,
		public method_name: string,
	) {}
}
