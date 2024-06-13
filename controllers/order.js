import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

export const getOrder = async (req, res) => {
    try {
        console.log('req.user.id', req.user.id);
        const response = await services.getOrder(req.user.id);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
export const createOrder = async (req, res) => {
    try {
        const response = await services.createOrder(req.body, req.user.id);
        return res.status(200).json(response);
    } catch (error) {
        return InternalServerError(res);
    }
};
