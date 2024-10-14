import express from 'express';
import { ProductCategoryRepository } from '../../adapters/repositories/product-category.repository';
import { ProductCategoryInteractor } from '../../use-cases/interactor/product-category.interactor';
import { ProductCategoryController } from '../../adapters/controllers/product-category.controller';

const repository = new ProductCategoryRepository();
const interactor = new ProductCategoryInteractor(repository);
const controller = new ProductCategoryController(interactor);

const router = express.Router();

router.get('/', controller.get.bind(controller));
router.post('/create', controller.create.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.delete.bind(controller));

export = router;
