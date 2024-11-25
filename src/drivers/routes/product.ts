import express from 'express';
import { ProductController } from '../../adapters/controllers/product';
import { ProductInteractor } from '../../use-cases/interactor/product';
import { ProductRepository } from '../../adapters/repositories/product';
import { body } from 'express-validator';
import { validator } from '../../middleware/validator';
import { checkRoleEmployeeOrManager, verifyToken } from '../../middleware/auth';

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

router.get('/', controller.get.bind(controller));
router.get('/:anjeng', controller.getDetails.bind(controller));
router.post(
	'/create',
	verifyToken,
	checkRoleEmployeeOrManager,
	validator(createProductValidations),
	controller.create.bind(controller),
);
router.patch(
	'/update/:id',
	verifyToken,
	checkRoleEmployeeOrManager,
	validator(updateProductValidations),
	controller.update.bind(controller),
);
router.delete(
	'/delete/:id',
	verifyToken,
	checkRoleEmployeeOrManager,
	controller.delete.bind(controller),
);

export default router;
