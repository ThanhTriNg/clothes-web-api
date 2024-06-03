import { subCategorySchema } from '../helpers/joi_schema';
import { InternalServerError, badRequest } from '../middlewares/handle_error';

import Joi from 'joi';
import * as services from '../services';

//sub categories
export const getAllSubCategories = async (req, res) => {
    try {
        const response = await services.getAllSubCategories(req.query);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error);(error);
        return InternalServerError(res);
    }
};
export const getSubCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await services.getSubCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error);(error);
        return InternalServerError(res);
    }
};

export const createSubCategory = async (req, res) => {
    try {
        const { error } = Joi.object(subCategorySchema).validate(req.body);
        // console.log(error);('error>>', error);
        if (error) {
            return badRequest(error.details[0].message, res);
        }

        const response = await services.createSubCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error);(error);
        return InternalServerError(res);
    }
};
