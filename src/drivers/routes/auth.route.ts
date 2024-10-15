import express from 'express';
import { AuthRepository } from '../../adapters/repositories/auth.repository';
import { AuthInteractor } from '../../use-cases/interactor/auth.interactor';
import { AuthController } from '../../adapters/controllers/auth.controller';
import { body } from 'express-validator';
import { validator } from '../../middleware/validator';

const loginValidator = [
	body('email').notEmpty().withMessage('Email cant be empty'),
	body('password').notEmpty().withMessage('Password cant be empty'),
];

const repository = new AuthRepository();
const interactor = new AuthInteractor(repository);
const controller = new AuthController(interactor);

const router = express.Router();

router.post('/login', validator(loginValidator), controller.login.bind(controller));

export = router;
