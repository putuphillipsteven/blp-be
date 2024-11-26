import express from 'express';
import { ProductImageRepository } from '../../adapters/repositories/product-image';
import { ProductImageInteractor } from '../../use-cases/interactor/product-image';
import { ProductImageController } from '../../adapters/controllers/product-image';
import { uploadProductImageFile } from '../../middleware/multer';

const repository = new ProductImageRepository();
const interactor = new ProductImageInteractor(repository);
const controller = new ProductImageController(interactor);

const router = express.Router();

router.post(
	'/v1/product-images',
	uploadProductImageFile,
	controller.onCreateProductImage.bind(controller),
);

export default router;
