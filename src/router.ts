import { Router } from 'express';
import productRoute from './drivers/routes/product';
import productCategoriesRoute from './drivers/routes/product-category';
import transactionRoute from './drivers/routes/transaction';
import authRoute from './drivers/routes/auth';
import userRoute from './drivers/routes/user';
import productImageRoute from './drivers/routes/product-image';

const router = Router();

router.use('/products', productRoute);

router.use('/product-categories', productCategoriesRoute);

router.use('/transactions', transactionRoute);

router.use('/auth', authRoute);

router.use('/users', userRoute);

router.use('/product-images', productImageRoute);

export default router;
