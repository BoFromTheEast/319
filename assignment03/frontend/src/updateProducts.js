import React, { useState, useEffect } from "react";

function UpdateProducts() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    if (productId) {
      fetch(`http://127.0.0.1:8081/getProduct/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          setProduct(data);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    }
  }, [productId]);

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
          // Reset form fields or perform any necessary actions after successful update
          setProductId("");
          setProduct(null);
          setNewPrice("");
        })
        .catch((error) => {
          console.error("Error updating product price:", error);
        });
    }
  };

  return (
    <div>
      <h3>Update Product Price</h3>
      <input
        type="number"
        placeholder="Enter product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <br />
      {product && (
        <div>
          <h4>Product Details:</h4>
          <p>ID: {product.id}</p>
          <p>Title: {product.title}</p>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
          <p>Category: {product.category}</p>
          <p>
            Image: {<img src={product.image} width="100" alt={product.title} />}
          </p>
          <p>
            Rating: {product.rating?.rate} ({product.rating?.count} reviews)
          </p>
        </div>
      )}
      {product && (
        <div>
          <input
            type="number"
            placeholder="Enter new price"
            step="0.01"
            min="0"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
          />
          <br />
          <button onClick={handleUpdatePrice}>Update Price</button>
        </div>
      )}
    </div>
  );
}

export default UpdateProducts;
