import { getMedia, uploadImage as uploadImageApi } from '../controllers';
import uploadCloud from '../middlewares/uploader';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verify_token';
const router = Router();

const uploadImageCloud = uploadCloud.fields([
    {
        name: 'imageUrls',
    },
]);

//PRIVATE
router.use(verifyToken);
router.get('/', getMedia);
router.post('/', uploadImageCloud, uploadImageApi);

export default router;
