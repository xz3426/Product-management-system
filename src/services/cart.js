import apiCall from './api';


export const fetchCart = async (data) => {
  return await apiCall({
    url: `/api/cart/fetchCart`,
    method: 'POST',
    data
  });
};

export const addProduct = async (data) => {
  return await apiCall({
    url: `/api/cart/addProduct`,
    method: 'POST',
    data
  });
};

export const removeProduct = async (data) => {
  return await apiCall({
    url: `/api/cart/removeProduct`,
    method: 'DELETE',
    data
  });
};

export const updateQuantity = async (data) => {
  return await apiCall({
    url: `/api/cart/updateQuantity`,
    method: 'PUT',
    data
  });
};

export const checkout = async (data) => {
  return await apiCall({
    url: `/api/cart/checkout`,
    method: 'POST',
    data
  });
};


