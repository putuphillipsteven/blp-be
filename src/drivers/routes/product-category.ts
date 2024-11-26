import express from 'express';
import { ProductCategoryRepository } from '../../adapters/repositories/product-category';
import { ProductCategoryInteractor } from '../../use-cases/interactor/product-category';
import { ProductCategoryController } from '../../adapters/controllers/product-category';

const repository = new ProductCategoryRepository();
const interactor = new ProductCategoryInteractor(repository);
const controller = new ProductCategoryController(interactor);

const router = express.Router();

router.get('/v1/product-categories', controller.get.bind(controller));
router.get('/v1/product-categories/:id', controller.getDetails.bind(controller));
router.post('/v1/product-categories', controller.create.bind(controller));
router.patch('/v1/product-categories/:id', controller.update.bind(controller));
router.delete('/v1/product-categories/:id', controller.delete.bind(controller));

export default router;
