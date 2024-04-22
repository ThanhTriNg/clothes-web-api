import { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers';
import { Router } from 'express';
import uploadCloud from '../middlewares/uploader';
import { verifyToken } from '../middlewares/verify_token';
import { isAdmin } from '../middlewares/verify_role';
const router = Router();
router.get('/', getAllProducts);
router.get('/:id', getProduct);

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

// router.use(verifyToken);
// router.use(isAdmin);

router.post('/', uploadImage, createProduct);

router.patch('/:id', uploadImage, updateProduct);

router.delete('/:id', deleteProduct);

export default router;
