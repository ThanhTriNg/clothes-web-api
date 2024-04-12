import { insertData } from '../controllers';
import { Router } from 'express';

const router = Router();
router.post('/', insertData);

export default router;
