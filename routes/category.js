import { getAllCategories } from '../controllers';
import { Router } from 'express';

const router = Router();
router.get('/', getAllCategories);

export default router;
