import apiCall from "./api";

export const createProduct = async ({ product }) => {
  return await apiCall({
    url: `/api/products/product`,
    method: `POST`,
    data: { product },
  });
};

export const fetchProducts = async () => {
  return await apiCall({
    url: "/api/products/products",
    method: "GET",
  });
};
