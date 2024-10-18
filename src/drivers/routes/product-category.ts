import express from 'express';
import { ProductCategoryRepository } from '../../adapters/repositories/product-category';
import { ProductCategoryInteractor } from '../../use-cases/interactor/product-category';
import { ProductCategoryController } from '../../adapters/controllers/product-category';

const repository = new ProductCategoryRepository();
const interactor = new ProductCategoryInteractor(repository);
const controller = new ProductCategoryController(interactor);

const router = express.Router();

router.get('/', controller.get.bind(controller));
router.get('/:id', controller.getDetails.bind(controller));
router.post('/create', controller.create.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export default router;
