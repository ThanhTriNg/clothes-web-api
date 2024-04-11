import { Router } from "express";
const router = Router();

import { getClothes, getClothesById } from "../controllers/clothes";

router.get("/", getClothes);

router.get("/:id", getClothesById);

export default router;
