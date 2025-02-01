import { ENDPOINTS } from "../util/config"; 

interface Product {
    id: number;
    name: string;
    price: number; 
    quantity: number 
  }

export const getProducts = async (accessToken: string): Promise<Product[]> => {
  try {
    const response = await fetch(ENDPOINTS.getAllProduct, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to fetch products");
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: number, accessToken: string): Promise<Product> => {
    try {
      const response = await fetch(`${ENDPOINTS.getProductById}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      }
  
      throw new Error("Failed to fetch product");
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error;
    }
  };
  

export const createProduct = async (
  product: { name: string; price: number; quantity:number },
  accessToken: string
): Promise<Product> => {
  try {
    const response = await fetch(ENDPOINTS.CreateProduct, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to create product");
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (
  product: Product,
  accessToken: string
): Promise<Product> => {
  try {
    const response = await fetch(`${ENDPOINTS.UpdateProduct}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(product),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Failed to update product");
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (
    productId: number,
    accessToken: string
  ): Promise<void> => {
    try {
      const response = await fetch(`${ENDPOINTS.DeleteProduct}/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };
  