import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ValidationChain } from 'express-validator/lib/chain';

export const validatorMiddleware = (validations: (ValidationChain | undefined)[]) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		// Filter out undefined validations
		const definedValidations = validations.filter(
			(validation): validation is ValidationChain => validation !== undefined,
		);

		for (let validation of definedValidations) {
			const result = await validation.run(req);
			if (!result.isEmpty()) break;
		}

		const errors = validationResult(req);
		if (errors.isEmpty()) {
			return next();
		}
		return res.status(400).json({ errors: errors.array() });
	};
};
