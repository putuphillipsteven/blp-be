import { UpdateProfileController } from '../../adapters/controllers/profileImageController';
import { uploadProfileFile } from '../../middleware/multer';
import express from 'express';

const router = express.Router();

router.patch('/:id', uploadProfileFile, UpdateProfileController);

export = router;
