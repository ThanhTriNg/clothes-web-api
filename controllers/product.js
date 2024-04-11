// const pool = require("../util/database");

// const clothesController = {
//   getClothes: async (req, res) => {
//     try {
//       let { page, pageSize } = req.query;

//       page = parseInt(page) || 1;
//       pageSize = parseInt(req.query.pageSize) || 10;

//       const offset = (page - 1) * pageSize;
//       const [rows, fields] = await pool.query(
//         "SELECT * FROM clothes LIMIT ?, ?",
//         [offset, pageSize]
//       );
//       if (rows.length === 0) {
//         return res.status(404).json({ message: "Clothes not found" });
//       } else {
//         const [totalCountRows] = await pool.execute(
//           "SELECT COUNT(*) AS total FROM clothes"
//         );
//         const totalCount = totalCountRows[0].total;
//         const totalPages = Math.ceil(totalCount / pageSize);
//         res.json({
//           data: rows,
//           currentPage: page,
//           pageSize: pageSize,
//           totalPages: totalPages,
//           totalCount: totalCount,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   getClothesById: async (req, res) => {
//     try {
//       const { id } = req.params;

//       const [rows, fields] = await pool.query(
//         "SELECT * FROM clothes WHERE ID = ?",
//         [id]
//       );
//       if (rows.length === 0) {
//         return res.status(404).json({ error: "Clothes not found" });
//       } else {
//         res.json({ data: rows });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   },
// };

// module.exports = clothesController;

import * as services from "../services";

export const getAllProduct = async (req, res) => {
  try {
    const response = await services.getAllProduct();
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      err: -1,
      message: "Internal Server Error",
    });
  }
};
