import { Router } from 'express';
import { getOrderByUser, createOrder, getAllOrdersAdmin, getAllOrdersAdminById } from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
const router = Router();

//PRIVATE
router.use(verifyToken);
router.get('/', getOrderByUser);
router.post('/', createOrder);

// need admin account
router.use(isAdmin);
router.get('/admin', getAllOrdersAdmin);
router.get('/admin/:id', getAllOrdersAdminById);

export default router;
