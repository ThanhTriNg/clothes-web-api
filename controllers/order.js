import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';

//for admin
export const getAllOrdersAdmin = async (req, res) => {
    try {
        const response = await services.getAllOrdersAdmin(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return InternalServerError(res);
    }
};
// export const getAllOrdersAdminById = async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const response = await services.getAllOrdersAdminById(orderId);
//         return res.status(200).json(response);
//     } catch (error) {
//         console.log(error);
//         return InternalServerError(res);
//     }
// };
//for user
export const getOrderByUser = async (req, res) => {
    try {
        console.log('req.user.id', req.user.id);
        const response = await services.getOrderByUser(req.user.id, req.query);
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
