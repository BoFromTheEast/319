const express = require("express");
const db = require("./db.js");
const cors = require("cors");
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
//app.use(express.static("public"));
//app.use("/images", express.static("images"));
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

//Route to get all posts
app.get("/catalog", async (req, res) => {
  try {
    const query = "SELECT * FROM fakestore_catalog";
    const [result] = await db.query(query); // Execute the query and wait for the result
    console.log("Success in Reading MySQL");
    res.status(200).send(result); // Send the results as the response
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

//Get items by category
app.get("/catalog/:id", async (req, res) => {
  try {
    // Read id from frontend
    const id = req.params.id;
    const query = "SELECT * FROM fakestore_catalog WHERE id = ?";
    const [result] = await db.query(query, [id]); // Ensure to use array for parameters even if it's just one
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

//Get item by category
app.get("/catalog/category/:category", async (req, res) => {
  try {
    // Read category from frontend
    const category = req.params.category;
    const query = "SELECT * FROM fakestore_catalog WHERE category = ?";
    const [result] = await db.query(query, [category]);
    console.log("Success in Reading MySQL");
    res.status(200).send(result);
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res
      .status(500)
      .send({ error: "An error occurred while fetching items by category." });
  }
});

//Create one new product
app.post("/catalog/newProduct", async (req, res) => {
  try {
    const { title, price, description, category, image, rating } = req.body; //body that recieves the value
    const query =
      "INSERT INTO fakestore_catalog (title, price, description, category, image, rating) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [title, price, description, category, image, rating]; //the value of the parameter
    await db.query(query, values);
    console.log("New product created successfully");
    res.status(201).send({ message: "Product created successfully" });
  } catch (err) {
    console.error("Error creating new product:", err);
    res
      .status(500)
      .send({ error: "An error occurred while creating the product" });
  }
});

//Update a product
app.put("/catalog/updateProduct/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const query = "SELECT * FROM fakestore_catalog";
    const [result] = await db.query(query); // Execute the query and wait for the result
    console.log("Success in Reading MySQL");
    res.status(200).send(result); // Send the results as the response
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});

//Delete a product
app.delete("/catalog/deleteProduct", async (req, res) => {
  try {
    const query = "SELECT * FROM fakestore_catalog";
    const [result] = await db.query(query); // Execute the query and wait for the result
    console.log("Success in Reading MySQL");
    res.status(200).send(result); // Send the results as the response
  } catch (err) {
    // If an error occurs, catch it and send an appropriate error response
    console.error("Error in Reading MySQL :", err);
    res.status(500).send({ error: "An error occurred while fetching items." });
  }
});
