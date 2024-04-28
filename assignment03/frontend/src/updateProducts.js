import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

function UpdateProducts() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

  const fetchProductDetails = () => {
    fetch(`http://127.0.0.1:8081/getProduct/${productId}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  };

  const handleUpdatePrice = () => {
    if (product) {
      const updatedProduct = {
        newPrice: newPrice,
      };

      fetch(`http://127.0.0.1:8081/changeProduct/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
          // Fetch the updated product details after successful price update
          fetchProductDetails();
          // Reset form fields
          setNewPrice("");
        })
        .catch((error) => {
          console.error("Error updating product price:", error);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h3>Update Product Price</h3>
      <input
        type="number"
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      {product && (
        <div style={{ textAlign: "center" }}>
          <h4>Product Details:</h4>
          <p>ID: {product.id}</p>
          <p>Title: {product.title}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>
            Image:{" "}
            <img
              src={product.image}
              width="100"
              alt={product.title}
              style={{ display: "block", margin: "0 auto" }}
            />
          </p>
          <p>
            Rating: {product.rating?.rate} ({product.rating?.count} reviews)
          </p>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Price: {product.price}
          </p>
        </div>
      )}
      {product && (
        <div style={{ textAlign: "center" }}>
          <input
            type="number"
            placeholder="Enter new price"
            step="0.01"
            min="0"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
          <br />
          <Button variant="danger" onClick={handleUpdatePrice}>
            Update Price
          </Button>
        </div>
      )}
    </div>
  );
}

export default UpdateProducts;
