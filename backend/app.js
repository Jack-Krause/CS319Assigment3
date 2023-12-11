var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const Product = require("./productModel");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());

const port = 4000;
const host = "127.0.0.1";
const url = "mongodb://127.0.0.1:27017/reactdata";

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use('/images', express.static(path.join(__dirname, 'images')));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

// GET request method
app.get("/listProducts", async(req, res) => {
    try {
        const results = await Product.find().limit(100);
        console.log(results);
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET request method by id
app.get("/getProduct/:id", async(req, res) => {
    try {
        const productId = req.params.id;
        const result = Product.findOne({ id: productId });
        
        console.log("Result:", result);
        if (!result) {
            res.status(404).send("not found");
        } else {
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// POST request method - add to the mongodb
app.post("/addProduct", async(req, res) => {
    try {
        const { id, title, price, description, category, image, rating } = req.body;
        const productToPost = new Product(
            {
                id, title, price, description, category, image, rating
            }
        );

        await productToPost.save();
        res.status(201).send("Post success");
    } catch (error) {
        res.status(500).send(error.message);
    }
});
