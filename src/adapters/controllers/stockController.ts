import { updateStockService } from '../services/stockService';
import { Request, Response } from 'express';

export const updateStockController = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const newId = Number(id);
		const { branch_id, product_id, quantity } = req.body;
		const result = await updateStockService(newId, branch_id, product_id, quantity);
		return res.status(200).json({
			message: 'Update Stock Success',
			data: result,
		});
	} catch (err) {
		throw err;
	}
};
