export const {
    VITE_API_URL: API_URL,
  } = import.meta.env;

  const URL = 'https://localhost:44375';
  
  export const ENDPOINTS = {
    signin: `${URL}/api/Authentication/authenticate`,
    refresh: `${URL}/api/Authentication/refresh`,
    logout: `${URL}/api/Authentication/logout`,

    //Product 

    getAllProduct: `${URL}/Product/GetProducts`,
    getProductById: `${URL}/Product/GetProductById`,
    CreateProduct: `${URL}/Product/Create`,
    UpdateProduct: `${URL}/Product/Update`,
    DeleteProduct: `${URL}/Product/Delete`,

  };
  