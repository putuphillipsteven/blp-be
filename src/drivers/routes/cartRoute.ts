import { createCartController } from '../../adapters/controllers/cartController';
import express from 'express';

const router = express.Router();

router.post('/create', createCartController);

export = router;
