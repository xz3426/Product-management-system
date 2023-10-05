import apiCall from "./api";

export const createProduct = async (data) => {
  console.log(data);
  return await apiCall({
    url: `/api/products/product`,
    method: `POST`,
    data,
  });
};

export const fetchProducts = async () => {
  return await apiCall({
    url: "/api/products/products",
    method: "GET",
  });
};
