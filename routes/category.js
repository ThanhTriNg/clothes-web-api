import { getAllCategories ,updateCategory} from '../controllers';
import { Router } from 'express';

const router = Router();
router.get('/', getAllCategories);
router.patch('/:id', updateCategory);

export default router;
