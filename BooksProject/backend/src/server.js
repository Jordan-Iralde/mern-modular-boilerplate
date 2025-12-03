import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Conexión a MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB conectado');
    // Arrancar servidor
    app.listen(PORT, () => {
        console.log(`🚀 Server corriendo en http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
});
