import express from 'express';
import { getAllRents, getRent, createRent, deleteRent } from '../controllers/RentController.js';

const rentRouter = express.Router();
rentRouter.get('/', getAllRents);
rentRouter.get('/:id', getRent);
rentRouter.post('/', createRent);
rentRouter.delete('/:id', deleteRent);

export default rentRouter;


