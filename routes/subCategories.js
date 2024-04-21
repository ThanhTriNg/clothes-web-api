import { Router } from 'express';
import { createSubCategory, getAllSubCategories, getSubCategory } from '../controllers';

const router = Router();

//sub categories
router.get('/', getAllSubCategories);
router.get('/:id', getSubCategory);
router.post('/', createSubCategory);
export default router;
