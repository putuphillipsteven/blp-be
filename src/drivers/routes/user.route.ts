import express from 'express';
import { body } from 'express-validator';
import { validator } from '../../middleware/validator';
import { UserRepository } from '../../adapters/repositories/user.repository';
import { UserInteractor } from '../../use-cases/interactor/user.interactor';
import { UserController } from '../../adapters/controllers/user.controller';

const repository = new UserRepository();
const interactor = new UserInteractor(repository);
const controller = new UserController(interactor);

const router = express.Router();

router.get('/', controller.get.bind(controller));

export = router;
