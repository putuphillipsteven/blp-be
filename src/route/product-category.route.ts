import express from 'express';
import { ProductCategoryRepository } from '../repositories/product-category.repository';
import { ProductCategoryInteractor } from '../interactor/product-category.interactor';
import { ProductCategoryController } from '../controller/product-category.controller';

const repository = new ProductCategoryRepository();
const interactor = new ProductCategoryInteractor(repository);
const controller = new ProductCategoryController(interactor);

const router = express.Router();

router.get('/', controller.onGetProductCategory.bind(controller));
router.post('/create', controller.onCreateProductCategory.bind(controller));

export = router;
