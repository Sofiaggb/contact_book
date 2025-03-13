import express from 'express';
import { controller } from '../controllers/userController.js';
import { getRoleUsers } from '../controllers/roleController.js';
import { authenticateToken, logout } from '../middleware/authToken.js';

const router = express.Router();

router.get('/role', getRoleUsers);

router.get('/',authenticateToken, controller.getAll);

router.post('/login', controller.login);
router.post('/logout', authenticateToken, logout);
router.post('/register', controller.create);
router.delete('/:id',authenticateToken, controller.delete);

export default router;

