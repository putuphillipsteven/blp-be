import express from 'express';
import { ProductController } from '../controller/product.controller';
import { ProductInteractor } from '../interactor/product.interactor';
import { ProductRepository } from '../repositories/product.repository';
import { body } from 'express-validator';
import { validator } from '../middleware/validator';
import { checkRoleEmployee, verifyToken } from '../middleware/auth.middleware';

const repository = new ProductRepository();
const interactor = new ProductInteractor(repository);
const controller = new ProductController(interactor);

const router = express.Router();

const createProductValidations = [
	body('product_name').notEmpty().withMessage('Product name cant be empty'),
	// body('product_group_id').notEmpty().withMessage('Product group cant be empty'),
	// body('product_status_id').notEmpty().withMessage('Product status cant be empty'),
	body('product_category_id').notEmpty().withMessage('Product category cant be empty'),
	body('product_price').isInt({ min: 100 }).withMessage('Product price cant 100 rupiah'),
];

const updateProductValidations = [
	body('product_image').notEmpty().withMessage('Product image cant be empty').optional(),
	body('product_price').isInt({ min: 100 }).withMessage('Product price cant 100 rupiah').optional(),
];

router.get('/', controller.onGetProduct.bind(controller));
router.post(
	'/create',
	verifyToken,
	checkRoleEmployee,
	validator(createProductValidations),
	controller.onCreateProduct.bind(controller),
);
router.patch(
	'/update/:id',
	validator(updateProductValidations),
	controller.onUpdateProduct.bind(controller),
);
router.delete('/delete/:id', controller.onDeleteProduct.bind(controller));

export = router;
