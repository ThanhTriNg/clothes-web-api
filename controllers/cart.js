import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';
export const createCart = async (req, res) => {
    try {
        const response = await services.createCart(req.user.id);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
export const getCart = async (req, res) => {
    try {
        const response = await services.getCart(req.user.id);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
export const addItemIntoCart = async (req, res) => {
    try {
        // console.log('req.user.id', req.user.id);
        // console.log(req.body);
        const response = await services.addItemIntoCart(req.body, req.user.id);

        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
