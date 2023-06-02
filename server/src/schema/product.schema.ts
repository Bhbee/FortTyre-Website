import { object, string } from "yup";

const payload = {
  body: object({
    name: string().required("Name of product is required"),
    description: string()
      .required("Description is required")
      .min(120, "Description is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    productId: string().required("productId is required"),
  }),
};

export const addProductSchema = object({
  ...payload,
});

export const updateProductSchema = object({
  ...params,
  ...payload,
});

export const deleteProductSchema = object({
  ...params,
});