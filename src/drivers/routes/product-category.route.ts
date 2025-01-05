import express from 'express';
import { ProductCategoryRepository } from '../../adapters/repositories/product-category.repository';
import { ProductCategoryInteractor } from '../../use-cases/interactor/product-category.interactor';
import { ProductCategoryController } from '../../adapters/controllers/product-category.controller';
import {AuthMiddleware} from "../../middleware/auth.middleware";

const repository = new ProductCategoryRepository();
const interactor = new ProductCategoryInteractor(repository);
const controller = new ProductCategoryController(interactor);

const router = express.Router();

router.get('/v1/product-categories', controller.get.bind(controller));
router.get('/v1/product-categories/:id', controller.getDetails.bind(controller));
router.post('/v1/product-categories', AuthMiddleware.verifyToken, AuthMiddleware.isEmployeeOrManager, controller.create.bind(controller));
router.patch('/v1/product-categories/:id', AuthMiddleware.verifyToken, AuthMiddleware.isEmployeeOrManager, controller.update.bind(controller));
router.delete('/v1/product-categories/:id', controller.delete.bind(controller));

export default router;
