import { Router } from "express";
import {
  createOrder,
  captureOrder,
  getOrders,
  getOrder,
} from "../controllers/orderController.js";
import { auth, optionalAuth } from "../middleware/auth.js";

const router = Router();

router.post("/create", optionalAuth, createOrder);
router.post("/capture", optionalAuth, captureOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrder);

export default router;
