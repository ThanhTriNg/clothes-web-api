import {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getAllSubCategories,
    getSubCategory,
    createSubCategory,
} from '../controllers';
import { Router } from 'express';

const router = Router();
//categories
router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.delete('/:id', deleteCategory);

//sub categories
router.get('/sub', getAllSubCategories);
router.get('/sub/:id', getSubCategory);
router.post('/sub', createSubCategory);
export default router;
