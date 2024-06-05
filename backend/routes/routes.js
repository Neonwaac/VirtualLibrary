import express from 'express';
import { createUser, showUsers, updateUser, getUser } from '../controllers/UserController.js';
import { loginUser } from '../controllers/LoginController.js';

const router = express.Router();

// USERS
router.get('/', showUsers);
router.post('/', createUser);
router.get('/:id', getUser);
router.post('/login', loginUser);
router.put('/:id', updateUser);

export default router;

