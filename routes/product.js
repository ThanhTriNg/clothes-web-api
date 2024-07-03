import { Router } from 'express';
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers';
import uploadCloud from '../middlewares/uploader';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
const router = Router();
const uploadImage = uploadCloud.fields([
    {
        name: 'imageUrl',
        maxCount: 1,
    },
    {
        name: 'subImageUrls',
        maxCount: 4,
    },
]);

router.get('/', getAllProducts);
router.get('/:id', getProduct);

// need admin account
router.use(verifyToken);
router.use(isAdmin);
router.post('/', uploadImage, createProduct);
router.patch('/:id', uploadImage, updateProduct);
router.delete('/:id', deleteProduct);

export default router;
