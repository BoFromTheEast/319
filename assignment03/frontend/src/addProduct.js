import React, { useState } from "react";
import Button from "react-bootstrap/Button";

function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rate, setRate] = useState("");
  const [count, setCount] = useState("");

  const handleAddProduct = () => {
    const newProduct = {
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rating: {
        rate: rate,
        count: count,
      },
    };

    fetch("http://127.0.0.1:8081/addProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product added successfully:", data);
        setTitle("");
        setPrice("");
        setDescription("");
        setCategory("");
        setImage("");
        setRate("");
        setCount("");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
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
      <h1>Add Product</h1>
      <div>
        <p>
          Title :{" "}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div>
        <p>
          Price :{" "}
          <input
            type="number"
            placeholder="Price"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div>
        <p>
          Description :{" "}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div>
        <p>
          Category :{" "}
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div>
        <p>
          Image URL :{" "}
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div>
        <p>
          Rating Rate :{" "}
          <input
            type="number"
            placeholder="Rating Rate"
            step="0.1"
            min="0"
            max="5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <div>
        <p>
          Rating Count :{" "}
          <input
            type="number"
            placeholder="Rating Count"
            min="0"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            style={{ marginBottom: "10px" }}
          />
        </p>
      </div>
      <Button variant="primary" onClick={handleAddProduct}>
        Add Product
      </Button>
    </div>
  );
}

export default AddProduct;
