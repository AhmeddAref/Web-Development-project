import { Router } from "express";
import { getproduct } from "../controllers/products.js";

var router = Router();

router.get("/getproduct/:id", getproduct);

export default router;
