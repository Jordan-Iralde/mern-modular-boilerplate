import { Router } from 'express';
import * as BookController from '../controllers/book.controller.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// Solo rutas protegidas por JWT
router.use(auth);

router.post('/', BookController.createBook);
router.get('/', BookController.getBooks);
router.get('/:id', BookController.getBookById);
router.put('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

export default router;
