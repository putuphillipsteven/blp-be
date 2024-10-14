import express from 'express';
import { AuthRepository } from '../../adapters/repositories/auth.repository';
import { AuthInteractor } from '../../use-cases/interactor/auth.interactor';
import { AuthController } from '../../adapters/controllers/auth.controller';

const repository = new AuthRepository();
const interactor = new AuthInteractor(repository);
const controller = new AuthController(interactor);

const router = express.Router();

router.post('/login', controller.login.bind(controller));

export = router;
