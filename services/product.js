import db from "../models";

export const getAllProduct = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Product.findAll({});
      resolve({
        message: response,
      });
    } catch (error) {
      reject(error);
    }
  });
