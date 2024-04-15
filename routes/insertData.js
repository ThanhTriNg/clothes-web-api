import { insertData, insertClothes } from '../controllers';
import { Router } from 'express';
import uploadCloud from '../middlewares/uploader';
const router = Router();
router.post('/', insertData);
router.post('/clothe',uploadCloud.single('imageUrl'), insertClothes);

export default router;
