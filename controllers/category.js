import * as services from '../services';
import { InternalServerError, badRequest } from '../middlewares/handle_error';

export const getAllCategories = async (req, res) => {
    try {
        const response = await services.getAllCategories();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
