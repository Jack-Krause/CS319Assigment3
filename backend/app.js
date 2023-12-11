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
})
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });

app.use('/images', express.static(path.join(__dirname, 'images')));

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
        const result = await Product.findOne({ id: productId });
        
        console.log("Result:", result);
        res.status(200).send(result);
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

// PUT request method - update and existing product from the db
app.put("/updateProduct", async(req, res) => {
    try {
        const productId = req.body.id;
        const { title, price, description, category, image, rating } = req.body;

        const fieldsToUpdate = {};

        if (title) fieldsToUpdate.title = title;
        if (price) fieldsToUpdate.price = price;
        if (description) fieldsToUpdate.description = description;
        if (category) fieldsToUpdate.category = category;
        if (image) fieldsToUpdate.image = image;
        if (rating) fieldsToUpdate.rating = rating;

        const updatedProduct = await Product.findOneAndUpdate(
            { id: productId },
            fieldsToUpdate,
            { new: true }
        );

        if (updatedProduct === null) {
            return res.status(404).send("Product was not pulled");
        }
        
        res.status(200).send(updatedProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/deleteProduct/:id", async(req, res) => {
    try {
        const productId = req.params.id;

        const deletedProduct = await Product.findOneAndDelete(
            { id: productId }
        );

        if (!deletedProduct) {
            return res.status(404).send("Not found");
        }

        res.status(200).send("Product deleted success");
    } catch (error) {
        res.status(500).send(error.message);
    }
});