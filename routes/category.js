import { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers';
import { Router } from 'express';

const router = Router();
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
