import { createCartservice } from '../services/cartService';
import { Request, Response } from 'express';

export const createCartController = async (req: Request, res: Response) => {
	try {
		const { customer_name } = req.body;
		const result = await createCartservice(customer_name);
		return res.status(200).json({
			message: 'Create Cart Success',
			data: result,
		});
	} catch (err) {
		throw err;
	}
};
