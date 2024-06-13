import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

export const getCartItem = async (req, res) => {
    try {
        const response = await services.getCartItem();
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
