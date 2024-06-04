import { createCart, getCart, addItemIntoCart } from '../controllers';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verify_token';
const router = Router();

//PRIVATE
router.use(verifyToken);
router.get('/', getCart);
router.post('/addItem', addItemIntoCart);
router.post('/', createCart);

export default router;
