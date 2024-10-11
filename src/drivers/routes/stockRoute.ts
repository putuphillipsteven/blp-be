import { updateStockController } from '../../adapters/controllers/stockController';
import express from 'express';

const router = express.Router();

router.patch('/update', updateStockController);

export = router;
