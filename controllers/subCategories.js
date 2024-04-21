import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

//sub categories
export const getAllSubCategories = async (req, res) => {
    try {
        const response = await services.getAllSubCategories();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
export const getSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await services.getSubCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const createSubCategory = async (req, res) => {
    try {
        const response = await services.createSubCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};