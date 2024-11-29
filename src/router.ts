import { Router } from 'express';
import productRoute from './drivers/routes/product.route';
import productCategoriesRoute from './drivers/routes/product-category.route';
import transactionRoute from './drivers/routes/transaction.route';
import authRoute from './drivers/routes/auth.route';
import userRoute from './drivers/routes/user.route';
import productImageRoute from './drivers/routes/product-image.route';

const router = Router();

router.use('/', productRoute);

router.use('/', productCategoriesRoute);

router.use('/', transactionRoute);

router.use('/', authRoute);

router.use('/', userRoute);

router.use('/', productImageRoute);

export default router;
