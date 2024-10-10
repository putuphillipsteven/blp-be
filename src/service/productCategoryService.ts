import {
  createProductCategoryQuery,
  updateProductCategoryQuery,
  getProductCategoryQuery,
  getProductGroupQuery,
  deleteProductCategoryQuery,
} from "../query/productCategoryQuery";

export const createProductCategoryService = async (
  product_category_name: string
) => {
  try {
    const res = await createProductCategoryQuery(
      product_category_name
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const updateProductCategoryService = async (
  id: number,
  product_category_name: string
) => {
  try {
    const res = await updateProductCategoryQuery(
      id,
      product_category_name
    );
    return res;
  } catch (err) {
    throw err;
  }
};

export const getProductCategoryService = async () => {
  try {
    const res = await getProductCategoryQuery();
    return res;
  } catch (err) {
    throw err;
  }
};

export const getProductGroupService = async () => {
  try {
    const res = await getProductGroupQuery();
    return res;
  } catch (err) {
    throw err;
  }
};

export const deleteProductCategoryService = async (
  id: number
) => {
  try {
    const res = await deleteProductCategoryQuery(id);
    return res;
  } catch (err) {
    throw err;
  }
};
