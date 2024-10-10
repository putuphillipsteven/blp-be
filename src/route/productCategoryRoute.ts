import {
  createProductCategoryController,
  updateProductCategoryController,
  getProductCategoryController,
  getProductGroupController,
  deleteProductCategoryController,
} from "../controller/productCategoryController";

import express from "express";
const router = express.Router();

router.get("/category", getProductCategoryController);
router.get("/group", getProductGroupController);
router.post("/category", createProductCategoryController);
router.patch("/:id", updateProductCategoryController);
router.delete(
  "/category/:id",
  deleteProductCategoryController
);

export = router;
