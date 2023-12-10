import React from "react";
import axios from "axios";

const getByIdFromDb = async (id) => {
    try {
        const mainContainer = document.getElementById("productContainer");
        const response = await axios.get(`http://localhost:8081/getProduct/${id}`);
        console.log(response.data);
        loadData(mainContainer, response.data);
    } catch (err) {
        console.log("[getByIdFromDb error]", err);
    }
}

const getFromDb = async () => {
    try {
        const mainContainer = document.getElementById("productContainer");
        mainContainer.innerHTML = 'Loading products...';
        const response = await axios.get("http://localhost:8081/listProducts");
        console.log(response.data);
        loadData(mainContainer, response.data);
    } catch (err) {
        console.error("[getFromDb error]", err);
    }
};

function loadData(mainContainer, products) {
    mainContainer.innerHTML = '';

    for(var i = 0; i <products.length; i++) {
        let id = products[i].id;
        let title = products[i].title;
        let price = products[i].price;
        let description = products[i].description;
        let category = products[i].category;
        // let image = 
        let rating = products[i].rating;
        let div = document.createElement("div");
        div.innerHTML = `
            <h2>${title}</h2>
            ${price} <br>
            ${description} <br>
            ${category}
            ${rating}
        `;
        mainContainer.append(div);
        console.log(div);
    }
}

export default getFromDb;