import React from "react";
import axios from "axios";

export const getByIdFromDb = async (id) => {
    try {
        const response = await axios.get(`http://localhost:8081/getProduct/${id}`);
        console.log(response.data);
        return response;
    } catch (err) {
        console.log("[getByIdFromDb error]", err);
        throw err;
    }
}

export const getFromDb = async () => {
    try {
        const response = await axios.get("http://localhost:8081/listProducts");
        console.log(response.data);
        return response;
    } catch (err) {
        console.error("[getFromDb error]", err);
        throw err;
    }
};
