import { Router } from "express";
import {
  getProducts,
  getProduct,
  getProductsByCategory,
  getFeaturedProducts,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/:id", getProduct);

export default router;
