import express from 'express';
import { AuthRepository } from '../../adapters/repositories/auth';
import { AuthInteractor } from '../../use-cases/interactor/auth';
import { AuthController } from '../../adapters/controllers/auth';
import { body } from 'express-validator';
import { validator } from '../../middleware/validator';
import { verifyToken } from '../../middleware/auth';

const loginValidator = [
	body('email').notEmpty().withMessage('Email cant be empty'),
	body('password').notEmpty().withMessage('Password cant be empty'),
];

const repository = new AuthRepository();
const interactor = new AuthInteractor(repository);
const controller = new AuthController(interactor);

const router = express.Router();

router.post('/v1/auth/login', validator(loginValidator), controller.login.bind(controller));
router.get('/v1/auth/keep-login', verifyToken, controller.keepLogin.bind(controller));

export default router;
