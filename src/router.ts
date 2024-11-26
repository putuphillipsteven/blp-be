import { Router } from 'express';
import productRoute from './drivers/routes/product';
import productCategoriesRoute from './drivers/routes/product-category';
import transactionRoute from './drivers/routes/transaction';
import authRoute from './drivers/routes/auth';
import userRoute from './drivers/routes/user';
import productImageRoute from './drivers/routes/product-image';

const router = Router();

router.use('/', productRoute);

router.use('/', productCategoriesRoute);

router.use('/', transactionRoute);

router.use('/', authRoute);

router.use('/', userRoute);

router.use('/', productImageRoute);

export default router;
