import express from 'express';
import { TransactionRepository } from '../repositories/transaction.repository';
import { TransactionInteractor } from '../interactor/transaction.interactor';
import { TransactionController } from '../controller/transaction.controller';

// Define all neccesary class
const repository = new TransactionRepository();
const interactor = new TransactionInteractor(repository);
const controller = new TransactionController(interactor);

const router = express.Router();

router.get('/', controller.onGetTransactions.bind(controller));
router.post('/create', controller.onCreateTransaction.bind(controller));

export = router;
