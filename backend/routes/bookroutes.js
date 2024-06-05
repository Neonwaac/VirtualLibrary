import express from 'express';
import { getAllBooks, getBook } from '../controllers/BookController.js';

const bookRouter = express.Router();
bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getBook);

export default bookRouter;
