import express from 'express';
import { ProductImageRepository } from '../repositories/product-image.repository';
import { ProductImageInteractor } from '../interactor/product-image.interactor';
import { ProductImageController } from '../controller/product-image.controller';
import { uploadProductImageFile } from '../middleware/multer';

const repository = new ProductImageRepository();
const interactor = new ProductImageInteractor(repository);
const controller = new ProductImageController(interactor);

const router = express.Router();

router.post('/create', uploadProductImageFile, controller.onCreateProductImage.bind(controller));

export = router;
