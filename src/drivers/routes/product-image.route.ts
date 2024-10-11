import express from 'express';
import { ProductImageRepository } from '../../adapters/repositories/product-image.repository';
import { ProductImageInteractor } from '../../use-cases/interactor/product-image.interactor';
import { ProductImageController } from '../../adapters/controllers/product-image.controller';
import { uploadProductImageFile } from '../../middleware/multer';

const repository = new ProductImageRepository();
const interactor = new ProductImageInteractor(repository);
const controller = new ProductImageController(interactor);

const router = express.Router();

router.post('/create', uploadProductImageFile, controller.onCreateProductImage.bind(controller));

export = router;
