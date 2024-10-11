import { updateStockQuery } from '../queries/stockQuery';

export const updateStockService = async (
	id: number,
	branch_id: number,
	product_id: number,
	quantity: number,
) => {
	try {
		const res = await updateStockQuery(id, branch_id, product_id, quantity);
		return res;
	} catch (err) {
		throw err;
	}
};
