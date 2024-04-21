import Joi from 'joi';
import { categorySchema, updateCategorySchema } from '../helpers/joi_schema';
import { InternalServerError, badRequest } from '../middlewares/handle_error';
import * as services from '../services';

//categories
export const getAllCategories = async (req, res) => {
    try {
        const response = await services.getAllCategories();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
export const getCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await services.getCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const createCategory = async (req, res) => {
    try {
        const { error } = Joi.object(categorySchema).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }

        const response = await services.createCategory(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { error } = Joi.object(updateCategorySchema).validate(req.body);
        if (error) {
            return badRequest(error.details[0].message, res);
        }
        // const response = await services.updateCategory({ ...req.body, id });
        const response = await services.updateCategory(req.body, id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await services.deleteCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
