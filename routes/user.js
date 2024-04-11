import { getCurrentUser } from '../controllers';
import { getAllUserTU } from '../controllers';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verify_token';
const router = Router();

//PUBLIC
router.get('/countTU', getAllUserTU);

//PRIVATE
router.use(verifyToken);
router.get('/', getCurrentUser);

export default router;
