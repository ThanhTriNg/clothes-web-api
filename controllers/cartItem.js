import { InternalServerError } from '../middlewares/handle_error';
import * as services from '../services';
// export const createCartItem = async (req, res) => {
//     try {
//         const response = await services.createCartItem(req.user.id);
//         return res.status(200).json({ response });
//     } catch (error) {
//         return InternalServerError(res);
//     }
// };


export const getCartItem = async (req, res) => {
    try {
        const response = await services.getCartItem();
        return res.status(200).json(response);
    } catch (error) {
        // // console.log(error);(error);
        return InternalServerError(res);
    }
};