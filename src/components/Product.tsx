import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";
import "../assets/styles/product.css";
import SearchBar from "./SearchBar"; 

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Product: React.FC = () => {
  const accessToken =
    useSelector((state: RootState) => state.auth.accessToken) ||
    localStorage.getItem("accessToken");

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    quantity: 0,
  });
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    if (!accessToken) return;
    try {
      const data = await getProducts(accessToken);
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [accessToken]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, products]);

  const handleCreateOrUpdate = async () => {
    if (!accessToken) return;
    try {
      if (editProduct) {
        await updateProduct(editProduct, accessToken);
        alert("Product updated successfully!");
      } else {
        await createProduct(newProduct, accessToken);
        alert("Product added successfully!");
      }
      setShowModal(false);
      setEditProduct(null);
      setNewProduct({ id: 0, name: "", price: 0, quantity: 0 });
      fetchProducts(); 
    } catch (error) {
      console.error("Error handling product:", error);
    }
    
  };

  const handleDelete = async (id: number) => {
    if (!accessToken) return;
    const isConfirmed = window.confirm("Are you sure you want to delete this product?"); 
    if (isConfirmed) {
      try {
        await deleteProduct(id, accessToken);
        alert("Product deleted successfully!"); 
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="product-crud-container">
      <h2 className="text-2xl font-bold mb-4">
        Product List
        <br />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </h2>

      <br />
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add New Product
      </button>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quantity}</p>
            </div>
            <div className="product-actions">
              <button
                onClick={() => {
                  setEditProduct(product);
                  setShowModal(true);
                }}
                className="edit-btn"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3 className="text-xl font-bold mb-4">
              {editProduct ? "Edit Product" : "Add Product"}
            </h3>
            <input
              type="text"
              placeholder="Name"
              value={editProduct ? editProduct.name : newProduct.name}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, name: e.target.value })
                  : setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Price"
              value={editProduct ? editProduct.price : newProduct.price}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, price: +e.target.value })
                  : setNewProduct({ ...newProduct, price: +e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Quantity"
              value={editProduct ? editProduct.quantity : newProduct.quantity}
              onChange={(e) =>
                editProduct
                  ? setEditProduct({ ...editProduct, quantity: +e.target.value })
                  : setNewProduct({ ...newProduct, quantity: +e.target.value })
              }
            />
            <div className="flex gap-2 mt-4">
              <button onClick={handleCreateOrUpdate} className="save-btn">
                {editProduct ? "Update" : "Save"}
              </button>
              <button onClick={() => setShowModal(false)} className="close-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
