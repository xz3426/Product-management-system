import apiCall from "./api";

export const searchProducts = async (key) => {
  return await apiCall({
    url: `/api/search/${key}`,
    method: "GET",
  });
};
