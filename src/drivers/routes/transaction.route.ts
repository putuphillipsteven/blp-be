import express from 'express';
import { TransactionRepository } from '../../adapters/repositories/transaction.repository';
import { TransactionInteractor } from '../../use-cases/interactor/transaction.interactor';
import { TransactionController } from '../../adapters/controllers/transaction.controller';
import { body } from 'express-validator';
import { validator } from '../../middleware/validator';

// Define all neccesary class
const repository = new TransactionRepository();
const interactor = new TransactionInteractor(repository);
const controller = new TransactionController(interactor);

const router = express.Router();

const createTransactionValidations = [
	body('payment_method_id').isInt().notEmpty().withMessage('Please select payment method'),
	body('payment_amount').isInt({ min: 0 }).notEmpty().withMessage('Payment cant be empty or 0'),
	body('details').notEmpty().withMessage('Please select a product first'),
];

router.get('/', controller.get.bind(controller));
router.post('/create', validator(createTransactionValidations), controller.create.bind(controller));

export = router;
