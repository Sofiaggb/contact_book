import express from 'express';
import {controller} from '../controllers/contactController.js';
import { getDepartments, getRoles } from '../controllers/roleController.js';
import { upload } from '../config/multer.js';
import { authenticateToken } from '../middleware/authToken.js';


const router = express.Router();

router.get('/department', authenticateToken, getDepartments);
router.get('/role',authenticateToken, getRoles);

router.get('/contact/:id',authenticateToken, controller.getById);
router.get('/',authenticateToken, controller.getAll);
router.get('/search',authenticateToken, controller.getFiltered);

router.post('/save',authenticateToken, upload.single('image'), controller.create);
router.put('/update/:id',authenticateToken, upload.single('image'), controller.update);
router.delete('/delete/:id',authenticateToken, controller.delete);

export default router;
