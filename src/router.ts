import { Router } from 'express';

const router = Router();

const productCategoryRoute = require('./route/product-category.route');
router.use('/product-categories', productCategoryRoute);

const transactionRoute = require('./route/transaction.route');
router.use('/transaction', transactionRoute);

const authRoute = require('./route/authRoute');
router.use('/auth', authRoute);

const userRoute = require('./route/userRoute');
router.use('/user', userRoute);

const cartRoute = require('./route/cartRoute');
router.use('/cart', cartRoute);

const productRoute = require('./route/product.route');
router.use('/products', productRoute);

const productImageRoute = require('./route/product-image.route');
router.use('/product-images', productImageRoute);

const branchRoute = require('./route/branchRoute');
router.use('/branch', branchRoute);

const statusRoute = require('./route/statusRoute');
router.use('/status', statusRoute);

const profileRoute = require('./route/profileImageRoute');
router.use('/profile', profileRoute);

const stockRoute = require('./route/stockRoute');
router.use('/stock', stockRoute);

export default router;
