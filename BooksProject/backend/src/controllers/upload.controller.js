import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), 'uploads');

// Crear carpeta si no existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

export const uploadFile = (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        res.status(201).json({
            success: true,
            filename: req.file.filename,
            path: req.file.path,
        });
    } catch (err) {
        next(err);
    }
};
