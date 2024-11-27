import express from 'express';
import { body } from 'express-validator';
import { validator } from '../../middleware/validator';
import { UserRepository } from '../../adapters/repositories/user';
import { UserInteractor } from '../../use-cases/interactor/user';
import { UserController } from '../../adapters/controllers/user';
import { uploadAvatarFile } from '../../middleware/multer';

const repository = new UserRepository();
const interactor = new UserInteractor(repository);
const controller = new UserController(interactor);

const createUserValidations = [
	body('first_name').notEmpty().withMessage('First name cant be empty'),
	body('email').notEmpty().withMessage('Email cant be empty'),
	body('email').isEmail().withMessage('Invalid email format'),
	body('phone_number').notEmpty().withMessage('Phone number cant be empty'),
	body('password')
		.matches(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
		.withMessage(
			'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
		),
];
const router = express.Router();

router.get('/v1/users', controller.getUsers.bind(controller));
router.get('/v1/users/details/:id', controller.getUserDetails.bind(controller));
router.post('/v1/users', validator(createUserValidations), controller.createUser.bind(controller));
router.patch('/v1/users/:id', uploadAvatarFile, controller.updateUser.bind(controller));
router.delete('/v1/users/:id', controller.deleteUser.bind(controller));

export default router;
