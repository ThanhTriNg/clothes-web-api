import { getCurrentUser, getAllUsers } from '../controllers';
import { Router } from 'express';
import { verifyToken } from '../middlewares/verify_token';
const router = Router();

//PUBLIC
router.get('/a', getAllUsers);

//PRIVATE
router.use(verifyToken);
router.get('/', getCurrentUser);

export default router;
