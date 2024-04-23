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
const dbName = "secoms319";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

app.get("/listRobots", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db.collection("robot").find(query).limit(100).toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

app.get("/:id", async (req, res) => {
  const robotid = Number(req.params.id);
  console.log("Robot to find :", robotid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: robotid };
  const results = await db.collection("robot").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

app.post("/addRobot", async (req, res) => {
  try {
    await client.connect();
    console.log("Node connected successfully to GET MongoDB");
    const keys = Object.keys(req.body);
    const values = Object.values(req.body);
    const newDocument = {
      id: values[0], // also "id": req.body.id,
      name: values[1], // also "name": req.body.name,
      price: values[2], // also "price": req.body.price,
      description: values[3], // also "description": req.body.description,
      imageUrl: values[4], // also "imageUrl": req.body.imageUrl
    };
    const results = await db.collection("robot").insertOne(newDocument);
    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occured" });
  }
});

app.delete("/deleteRobot/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const query = { id: id };
    const robotDeleted = await db.collection("robot").findOne(query);

    if (!robotDeleted) {
      return res.status(404).send({ message: "Robot not found" });
    }
    const results = await db.collection("robot").deleteOne(query);

    if (results.deletedCount === 0) {
      return res.status(404).send({ message: "Robot not found" });
    }
    res.status(200).send(robotDeleted);
  } catch (error) {
    console.error("Error deleting robot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/updateRobot/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };

  try {
    await client.connect();
    console.log("Connected to database for updating robot with ID:", id);
    const robotExists = await db.collection("robot").findOne(query);
    if (!robotExists) {
      return res.status(404).send({ message: "Robot not found" });
    }
    const updateData = {
      $set: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      },
    };
    const results = await db.collection("robot").updateOne(query, updateData);
    if (results.matchedCount === 0) {
      return res
        .status(404)
        .send({ message: "No matching robot found to update" });
    }
    const robotUpdated = await db.collection("robot").findOne(query);
    res.status(200).send(robotUpdated);
  } catch (error) {
    console.error("Error updating robot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  } finally {
    await client.close();
  }
});
