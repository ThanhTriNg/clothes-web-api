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
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await services.updateCategory({...req.body, id});
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
