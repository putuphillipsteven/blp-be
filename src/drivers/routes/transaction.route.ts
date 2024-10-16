import express from 'express';
import { TransactionRepository } from '../../adapters/repositories/transaction.repository';
import { TransactionInteractor } from '../../use-cases/interactor/transaction.interactor';
import { TransactionController } from '../../adapters/controllers/transaction.controller';

// Define all neccesary class
const repository = new TransactionRepository();
const interactor = new TransactionInteractor(repository);
const controller = new TransactionController(interactor);

const router = express.Router();

router.get('/', controller.get.bind(controller));
router.post('/create', controller.create.bind(controller));

export = router;
