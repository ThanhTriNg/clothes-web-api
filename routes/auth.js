import * as controller from "../controllers";
import { Router } from "express";

const router = Router();
router.post("/register", controller.register);

export default router;
