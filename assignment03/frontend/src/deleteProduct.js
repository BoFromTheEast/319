import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function DeleteProducts() {
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (productId) {
      fetchProductDetails();
    } else {
      setProduct(null);
    }
  }, [productId]);

  function fetchProductDetails() {
    fetch(`http://localhost:8081/getProduct/${productId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setProduct(null);
      });
  }

  function deleteProductByID() {
    fetch(`http://localhost:8081/deleteProduct/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        alert("Product deleted successfully");
        setProductId(""); // Reset the input after successful deletion
        setProduct(null); // Reset the product details
      })
      .catch((error) => {
        console.error("Delete error:", error);
        alert("Failed to delete product");
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (productId) {
      deleteProductByID();
    } else {
      alert("Please enter a valid product ID");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="productId">Enter Product ID to Delete:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            style={{ marginLeft: "10px" }}
          />
          <Button variant="danger" type="submit" style={{ marginLeft: "10px" }}>
            Delete Product
          </Button>
        </div>
      </form>
      {product && (
        <div style={{ marginTop: "20px" }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} alt={product.title} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
                <p>
                  Rating: {product.rating?.rate} ({product.rating?.count}{" "}
                  reviews)
                </p>
              </Card.Text>
              {/* <Button variant="danger" onClick={deleteProductByID}>
                Delete Product
              </Button> */}
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}

export default DeleteProducts;
