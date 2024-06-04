import { createCartItem, getCartItem } from '../controllers';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verify_token';
const router = Router();


//PRIVATE
router.use(verifyToken);
// router.post('/', createCartItem);
router.get('/', getCartItem);

export default router;
