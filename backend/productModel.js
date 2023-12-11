const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        id: Number,
        title: String,
        price: Number,
        description: String,
        category: String,
        image: String,
        rating: Number
    }
);

const Product = mongoose.model("Product", productSchema, "fakestore_catalog");

module.exports = Product;