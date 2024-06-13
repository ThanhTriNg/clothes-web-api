import { Router } from 'express';
import { getOrder, createOrder } from '../controllers';
import { verifyToken } from '../middlewares/verify_token';
const router = Router();

//PRIVATE
router.use(verifyToken);
router.get('/', getOrder);
router.post('/', createOrder);

export default router;
