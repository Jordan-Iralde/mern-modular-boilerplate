import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// Rutas públicas
router.post('/login', UserController.loginUser);
router.post('/', UserController.createUser); // registrar usuario

// Rutas protegidas
router.use(auth);

router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
