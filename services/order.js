import { generatePaginationAndSortQueries, orderPaginationAndSortQueries } from '../helpers/servicesQueries';
import db from '../models';
import { Op } from 'sequelize';

//get order for admin
export const getAllOrdersAdmin = ({
    page = process.env.PAGE,
    pageSize = process.env.PAGE_SIZE,
    sort,
    order,
    key,
    orderID,
    ...query
}) =>
    new Promise(async (resolve, reject) => {
        try {
            const { queries, attributes } = generatePaginationAndSortQueries(page, pageSize, sort, order, key);
            console.log('queries>>', queries);
            if (orderID) {
                query.id = { [Op.substring]: orderID };
            }
            const { count, rows } = await db.Order.findAndCountAll({
                attributes: { ...attributes },
                where: { ...query },
                ...queries,
                include: [
                    {
                        model: db.Order_item,
                        attributes: {
                            exclude: ['OrderId'],
                        },
                    },
                ],
            });
            const totalCount = parseInt(count);
            const totalPages = Math.ceil(totalCount / pageSize);
            resolve({
                // err: response ? 0 : 1,
                // message: response ? 'Successfully' : `Not found `,
                data: rows,
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalPages,
                totalCount,
            });
        } catch (error) {
            reject(error);
        }
    });

// //get order for admin
// export const getAllOrdersAdminById = (orderId) =>
//     new Promise(async (resolve, reject) => {
//         try {
//             const response = await db.Order_item.findAll({
//                 where: { orderId },
//             });

//             resolve({
//                 // err: response ? 0 : 1,
//                 // message: response ? 'Successfully' : `Not found `,
//                 data: response,
//             });
//         } catch (error) {
//             reject(error);
//         }
//     });

//get order for user
export const getOrderByUser = (
    userId,
    { page = process.env.PAGE, pageSize = process.env.PAGE_SIZE, sort, order, key },
) =>
    new Promise(async (resolve, reject) => {
        try {
            // const queries = orderPaginationAndSortQueries(page, pageSize);
            const { queries, attributes } = generatePaginationAndSortQueries(page, pageSize, sort, order, key);

            const { count, rows } = await db.Order.findAndCountAll({
                attributes: { ...attributes },
                where: { userId },
                ...queries,
                include: [
                    {
                        model: db.Order_item,
                        attributes: {
                            exclude: ['OrderId'],
                        },
                    },
                ],
            });
            const totalCount = parseInt(count);
            const totalPages = Math.ceil(totalCount / pageSize);
            resolve({
                data: rows,
                currentPage: parseInt(page),
                pageSize: parseInt(pageSize),
                totalPages,
                totalCount,
            });
        } catch (error) {
            reject(error);
        }
    });

//order_item orderItem
export const createOrder = (body, userId) =>
    new Promise(async (resolve, reject) => {
        try {
            const responseUser = await db.User.findOne({
                where: { id: userId },
            });

            const responseOrder = await db.Order.create({
                userId,
                userLNameAtOrderTime: responseUser.lName,
                userFNameAtOrderTime: responseUser.fName,
                userAddressAtOrderTime: responseUser.address,
                userPhoneAtOrderTime: responseUser.phone,
            });

            const orderId = responseOrder.id;
            const orderItems = body.map((item) => {
                const {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    imageUrl: productImageUrl,
                } = item.product;
                const size = item.size;
                const quantity = item.quantity;
                const color = item.color;
                return {
                    productId,
                    orderId,
                    quantity,
                    colorAtOrderTime: color,
                    sizeAtOrderTime: size,
                    productNameAtOrderTime: productName,
                    priceAtOrderTime: productPrice,
                    imageUrlAtOrderTime: productImageUrl,
                };
            });
            const res = await db.Order_item.bulkCreate(orderItems);

            resolve({
                message: res ? 'Your order is confirmed' : 'Failed',
            });
        } catch (error) {
            reject(error);
        }
    });
