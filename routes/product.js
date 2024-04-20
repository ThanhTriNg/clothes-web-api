import { getAllProducts,getProduct, createProduct, updateProduct, deleteProduct } from '../controllers';
import { Router } from 'express';
import uploadCloud from '../middlewares/uploader';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
const router = Router();
router.get('/', getAllProducts);
router.get('/:id', getProduct);

// router.use(verifyToken);
// router.use(isAdmin);
router.post('/', uploadCloud.single('imageUrl'), createProduct);
router.patch('/:id', uploadCloud.single('imageUrl'), updateProduct);
router.delete('/:id', deleteProduct);

export default router;
