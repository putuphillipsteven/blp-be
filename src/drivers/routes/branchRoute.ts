import { getBranchIdController } from '../../adapters/controllers/branchController';
import express from 'express';

const router = express.Router();

router.get('/:id', getBranchIdController);

export = router;
