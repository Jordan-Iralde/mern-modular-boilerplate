import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile } from '../controllers/upload.controller.js';
import { auth } from '../middlewares/auth.js';

const router = Router();

// Configuración Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = `${Date.now()}-${file.originalname.replace(ext, '')}${ext}`;
        cb(null, name);
    },
});

const upload = multer({ storage });

// Rutas protegidas
router.use(auth);

router.post('/', upload.single('file'), uploadFile);

export default router;
