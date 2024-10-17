import { Router } from 'express';

const router = Router();

const productRoute = require('./drivers/routes/product.route');
router.use('/products', productRoute);

const productCategoryRoute = require('./drivers/routes/product-category.route');
router.use('/product-categories', productCategoryRoute);

const transactionRoute = require('./drivers/routes/transaction.route');
router.use('/transactions', transactionRoute);

const authRoute = require('./drivers/routes/auth.route');
router.use('/auth', authRoute);

const userRoute = require('./drivers/routes/user.route');
router.use('/users', userRoute);

const productImageRoute = require('./drivers/routes/product-image.route');
router.use('/product-images', productImageRoute);

export default router;
