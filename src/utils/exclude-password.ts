import { User } from '@prisma/client';

interface UserWithNullableFields extends User {}

export const exclude = (user: UserWithNullableFields, keys: string[]) => {
	return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
};
