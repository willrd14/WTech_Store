import { Router } from "express";
import {
  getDashboardStats,
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAdminOrders,
  updateOrderStatus,
} from "../controllers/adminController.js";
import { adminAuth } from "../middleware/admin.js";

const router = Router();

router.use(adminAuth);

router.get("/dashboard", getDashboardStats);
router.get("/products", getAdminProducts);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.get("/orders", getAdminOrders);
router.put("/orders/:id", updateOrderStatus);

export default router;
