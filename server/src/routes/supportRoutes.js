import { Router } from "express";
import { sendSupportEmail } from "../controllers/supportController.js";

const router = Router();

router.post("/", sendSupportEmail);

export default router;
