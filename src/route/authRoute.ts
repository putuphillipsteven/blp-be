import express from 'express';
import { loginController } from '../controller/authController';
import { body } from 'express-validator';
import { validator } from '../middleware/validator';

const router = express.Router();

const loginValidator = [
	body('email').notEmpty().withMessage('Email cant be empty'),
	body('password').notEmpty().withMessage('Password cant be empty'),
];

router.post('/login', validator(loginValidator), loginController);

export = router;
