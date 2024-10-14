import { Router } from 'express';

const router = Router();

const productRoute = require('./drivers/routes/product.route');
router.use('/products', productRoute);

const productCategoryRoute = require('./drivers/routes/product-category.route');
router.use('/product-categories', productCategoryRoute);

const transactionRoute = require('./drivers/routes/transaction.route');
router.use('/transaction', transactionRoute);

const authRoute = require('./drivers/routes/authRoute');
router.use('/auth', authRoute);

const userRoute = require('./drivers/routes/userRoute');
router.use('/user', userRoute);

const cartRoute = require('./drivers/routes/cartRoute');
router.use('/cart', cartRoute);

const productImageRoute = require('./drivers/routes/product-image.route');
router.use('/product-images', productImageRoute);

export default router;
