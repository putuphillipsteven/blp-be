import { Request, Response } from "express";
import {
  createProductCategoryService,
  updateProductCategoryService,
  getProductCategoryService,
  getProductGroupService,
  deleteProductCategoryService,
} from "../service/productCategoryService";

export const createProductCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { product_category_name } = req.body;
    const result = await createProductCategoryService(
      product_category_name
    );
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).send(err.message);
  }
};

export const updateProductCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { product_category_name } = req.body;
    const result = await updateProductCategoryService(
      Number(id),
      product_category_name
    );
    return res.status(200).json({
      message: "success",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).send(err.message);
  }
};

export const getProductCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getProductCategoryService();
    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).send(err.message);
  }
};

export const getProductGroupController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await getProductGroupService();
    return res.status(200).json({
      message: "Success",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).send(err.message);
  }
};

export const deleteProductCategoryController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = deleteProductCategoryService(Number(id));
    return res.status(200).json({
      message: "Delete Product Category Success",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error)
      return res.status(500).send(err.message);
  }
};
