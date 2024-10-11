import { getStatusController } from '../../adapters/controllers/statusController';
import express from 'express';

const router = express.Router();

router.get('/', getStatusController);

export = router;
