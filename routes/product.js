import { getAllProduct, createProduct } from '../controllers';
import { Router } from 'express';
import uploadCloud from '../middlewares/uploader';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
const router = Router();
router.get('/', getAllProduct);

router.use(verifyToken);
router.use(isAdmin);
router.post('/add', uploadCloud.single('imageUrl'), createProduct);

export default router;
