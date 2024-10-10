import express from 'express';
import { validator } from '../middleware/validator';
import { body } from 'express-validator';
import { UserController } from '../controller/userController';

const router = express.Router();
const userController = new UserController();

const createUserValidations = [
	body('first_name').notEmpty().withMessage('First name cant be empty'),
	body('email').notEmpty().withMessage('Email cant be empty'),
	body('email').isEmail().withMessage('Invalid email format'),
	body('password')
		.matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
		.withMessage(
			'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
		),
	,
];

router.post('/register', validator(createUserValidations), userController.createUser);

export = router;
