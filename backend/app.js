import express from "express";
import cors from 'cors';
import db from "./database/db.js";
import path from 'path';
import userRoutes from './routes/routes.js';
import bookRoutes from './routes/bookroutes.js';
import rentRoutes from './routes/rentroutes.js';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Determine __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure 'uploads' directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/rents', rentRoutes);

try {
    await db.authenticate();
    console.log('Conexión exitosa a la DB');
} catch (error) {
    console.log(`El error de conexión es: ${error}`);
}

app.listen(8000, () => {
    console.log('Server up running in http://localhost:8000/');
});
