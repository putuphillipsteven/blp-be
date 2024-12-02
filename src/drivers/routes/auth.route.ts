import express from 'express';
import { AuthRepository } from '../../adapters/repositories/auth.repository';
import { AuthInteractor } from '../../use-cases/interactor/auth.interactor';
import { AuthController } from '../../adapters/controllers/auth.controller';
import { body } from 'express-validator';
import { validatorMiddleware } from '../../middleware/validator.middleware';
import { verifyToken } from '../../middleware/auth.middleware';

const loginValidator = [
	body('email').notEmpty().withMessage('Email cant be empty'),
	body('password').notEmpty().withMessage('Password cant be empty'),
];

const repository = new AuthRepository();
const interactor = new AuthInteractor(repository);
const controller = new AuthController(interactor);

const router = express.Router();

router.post('/v1/auth/login', validatorMiddleware(loginValidator), controller.login.bind(controller));
router.get('/v1/auth/keep-login', verifyToken, controller.keepLogin.bind(controller));
router.post('/v1/auth/refresh-token', controller.refreshToken.bind(controller));

export default router;
