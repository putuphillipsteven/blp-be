import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

export const errorHandler: ErrorRequestHandler = (
	err,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const errStatus = (err.status as number) || 500;
	console.error('[ERROR]: ', err.message);
	res.status(errStatus).json({
		errors: {
			message: err.message || 'Something went wrong',
			stack: process.env.NODE_ENV === 'production' ? '[]' : err.stack,
		},
	});
};

export class ErrorHandler {
	public static generateResponse( error: any, req: Request, res: Response, next: NextFunction): Response {
		let JSONResponse: any = {}

		JSONResponse.status = error.status || 500;
		JSONResponse.message = error.message || 'Something went wrong';
		JSONResponse.stack = process.env.NODE_ENV === 'production' ? '[]' : error.stack;
		return res.status(error.status || 500).json(JSONResponse);
	}
}
