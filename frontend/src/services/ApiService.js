import React from "react";
import axios from "axios";

// Call GET request endpoint with endpoint variable {id}
export const getByIdFromDb = async (id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:4000/getProduct/${id}`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log("[getByIdFromDb error]", err);
        throw err;
    }
}

// Call general GET request endpoint
export const getFromDb = async () => {
    try {
        const response = await axios.get("http:///127.0.0.1:4000/listProducts");
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("[getFromDb error]", err);
        throw err;
    }
};

export const postToDb = async (productInfo) => {
    try {
        const response = await axios.post("http://127.0.0.1:4000/addProduct", productInfo);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error recieved in ApiService", error);
        throw error;
    }
};