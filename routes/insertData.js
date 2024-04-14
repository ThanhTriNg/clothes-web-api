import { insertData ,insertClothes} from '../controllers';
import { Router } from 'express';

const router = Router();
router.post('/', insertData);
router.post('/clothe', insertClothes);

export default router;
