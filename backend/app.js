var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
var axios = require("axios");
const { MongoClient } = require("mongodb");

app.use(cors());
app.use(bodyParser.json());

const port = "8081";
const host = "localhost";
const url = "mongodb://127.0.0.1:27017";
const dbName = "reactdata";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

// GET request method
app.get("/listProducts", async(req, res) => {
    await client.connect();
    console.log("Node connected successfully to MongoDB for GET");
    const query = {};
    const results = await db
        .collection("fakestore_catalog")
        .find(query)
        .limit(100)
        .toArray();
    console.log(results);
    res.status(200);
    res.send(results);
});

// GET request method by id
app.get("/getProduct/:id", async(req, res) => {
    const productId = Number(req.params.id);
    console.log("Looking for product:", productId);

    await client.connect();
    console.log("Node connected successfully to MongoDB for GET-id");
    const query = {"id": productId}

    const results = await db
        .collection("fakestore_catalog")
        .findOne(query)

    console.log("Result:", results);
    if (!results) {
        res.send("Not Found").status(404);
    } else {
        res.status(200);
        res.send(results);
    }
});

