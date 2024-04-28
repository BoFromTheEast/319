// Author: Ponciano Ramirez, Bo Oo
// ISU Netid : pram1347@iastate.edu, bhoo@iastate.edu
// Date :  April 27th, 2024
var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";
const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const dbName = "seassignment3";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});
//list robots
// app.get('/catalog', async (req, res) => {
//   await client.connect();
//   console.log('Node connected successfully to GET MongoDB');
//   const query = {};
//   const results = await db.collection('robot').find(query).limit(100).toArray();
//   console.log(results);
//   res.status(200);
//   res.send(results);
// });
//add robot
app.post("/addProduct", async (req, res) => {
  try {
    await client.connect();
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
      id: req.body.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
      rating: {
        // Include the Rating as an object
        rate: req.body.rating.rate,
        count: req.body.rating.count,
      },
    };
    const results = await db
      .collection("fakestore_catalog")
      .insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});
// //get by id
app.get("/getProduct/:id", async (req, res) => {
  const productId = Number(req.params.id);
  await client.connect();

  const query = { id: productId };
  const results = await db.collection("fakestore_catalog").findOne(query);

  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

//get all
app.get("/getAllProducts", async (req, res) => {
  try {
    await client.connect();
    const collection = db.collection("fakestore_catalog");

    const results = await collection.find({}).toArray();

    if (results.length === 0) {
      res.status(404).send("No products found");
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    res.status(500).send("Error retrieving products: " + error.message);
  } finally {
    await client.close();
  }
});

//delete by id
app.delete("/deleteProduct/:id", async (req, res) => {
  const productId = Number(req.params.id);
  console.log("Robot ID to delete:", productId);

  try {
    await client.connect();

    const result = await db
      .collection("fakestore_catalog")
      .deleteOne({ id: productId });
    if (result.deletedCount === 0) {
      res.status(404).send("not dasdasdasd");
    } else {
      res.send("deleted successfully");
    }
    await client.close();
  } catch (error) {
    res.status(500).send("Error");
    await client.close();
  }
});
// //change by id
app.put("/changeProduct/:id", async (req, res) => {
  const productID = Number(req.params.id);
  const { newPrice } = req.body;

  try {
    await client.connect();
    const collection = db.collection("fakestore_catalog");

    // Update the document where the 'id' field matches the productID
    const result = await collection.updateOne(
      { id: productID },
      {
        $set: {
          price: newPrice,
        },
      }
    );

    // Check if any document was actually modified
    if (result.modifiedCount === 0) {
      res.status(404).send("No matching product found to update.");
    } else {
      res.send("Product price updated successfully");
    }
  } catch (error) {
    res.status(500).send("Error updating the product: " + error.message);
  } finally {
    await client.close();
  }
});
