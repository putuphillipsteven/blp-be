import express from 'express';
import { ProductController } from '../../adapters/controllers/product.controller';
import { ProductInteractor } from '../../use-cases/interactor/product.interactor';
import { ProductRepository } from '../../adapters/repositories/product.repository';
import { body } from 'express-validator';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import {AuthMiddleware} from '../../middleware/auth.middleware';

const repository = new ProductRepository();
const interactor = new ProductInteractor(repository);
const controller = new ProductController(interactor);

const router = express.Router();

const createProductValidations = [
	body('product_name').notEmpty().withMessage('Product name cant be empty'),
	body('product_category_id').notEmpty().withMessage('Product category cant be empty'),
	body('product_price').isInt({ min: 100 }).withMessage('Product price cant 100 rupiah'),
];

const updateProductValidations = [
	body('product_image').notEmpty().withMessage('Product image cant be empty').optional(),
	body('product_price').isInt({ min: 100 }).withMessage('Product price cant 100 rupiah').optional(),
];

router.get('/v1/products', controller.get.bind(controller));

router.get('/v1/products/details/:id', controller.getDetails.bind(controller));

router.post(
	'/v1/products',
	AuthMiddleware.verifyToken,
	AuthMiddleware.isEmployeeOrManager,
	validatorMiddleware(createProductValidations),
	controller.create.bind(controller),
);

router.patch(
	'/v1/products/:id',
	AuthMiddleware.verifyToken,
	AuthMiddleware.isEmployeeOrManager,
	validatorMiddleware(updateProductValidations),
	controller.update.bind(controller),
);

router.delete(
	'v1/products/:id',
	AuthMiddleware.verifyToken,
	AuthMiddleware.isEmployeeOrManager,
	controller.delete.bind(controller),
);

export default router;
