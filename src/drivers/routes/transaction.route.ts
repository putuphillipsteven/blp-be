import express from 'express';
import { TransactionRepository } from '../../adapters/repositories/transaction.repository';
import { TransactionInteractor } from '../../use-cases/interactor/transaction.interactor';
import { TransactionController } from '../../adapters/controllers/transaction.controller';
import { body } from 'express-validator';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import {AuthMiddleware} from '../../middleware/auth.middleware';

const repository = new TransactionRepository();
const interactor = new TransactionInteractor(repository);
const controller = new TransactionController(interactor);

const router = express.Router();

const createTransactionValidations = [
	body('payment_method_id').isInt().notEmpty().withMessage('Please select payment method'),
	body('payment_amount').isInt({ min: 0 }).notEmpty().withMessage('Payment cant be empty or 0'),
	body('details').notEmpty().withMessage('Please select a product first'),
];

router.get('/v1/transactions', AuthMiddleware.verifyToken, AuthMiddleware.isEmployeeOrManager, controller.get.bind(controller));
router.patch('/v1/transactions', AuthMiddleware.verifyToken,  AuthMiddleware.isManager, controller.update.bind(controller));
router.post(
	'/v1/transactions',
	AuthMiddleware.verifyToken,
	validatorMiddleware(createTransactionValidations),
	controller.create.bind(controller),
);

export default router;
