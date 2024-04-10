const express = require("express");
const router = express.Router();

const clothesController = require("../controllers/clothes");

router.get("/", clothesController.getClothes);

router.get("/:id", clothesController.getClothesById);

module.exports = router;
