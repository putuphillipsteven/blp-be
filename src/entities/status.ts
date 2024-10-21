import { Status as StatusPrisma } from '@prisma/client';

export class Status implements StatusPrisma {
	constructor(
		public id: number,
		public name: string,
	) {}
}
