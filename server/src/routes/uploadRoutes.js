import { Router } from "express";
import upload from "../middleware/upload.js";
import { adminAuth } from "../middleware/admin.js";

const router = Router();

router.post("/product-image", adminAuth, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const imageUrl = `/uploads/products/${req.file.filename}`;
  res.json({ url: imageUrl });
});

export default router;
