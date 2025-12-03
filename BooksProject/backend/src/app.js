import express from 'express';

import bookRoutes from './routes/book.routes.js';
import userRoutes from './routes/user.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import authRoutes from './routes/auth.routes.js';

import { errorHandler } from './utils/error.js';

const app = express();
app.use(express.json());

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/uploads', uploadRoutes);
app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;
