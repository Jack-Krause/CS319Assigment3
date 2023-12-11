import React, { createContext, useState, useContext, useEffect } from "react";
import { getByIdFromDb, getFromDb } from "../services/ApiService";

const SearchViewContext = createContext();

export const SearchViewProvider = ({ children }) => {
  const [searchId, setSearchId] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [productById, setProductById] = useState(null);

  // Call ApiService method to send GET request and sets the products
  const fetchAllProducts = async () => {
    try {
      const data = await getFromDb();
      setAllProducts(data);
    } catch (err) {
      console.error("[fetchAllProducts error]", err);
      throw err;
    }
  };

  // Call ApiService with id GET request
  const fetchId = async (id) => {
    try {
      const data = await getByIdFromDb(id);
      setProductById(data);
    } catch (err) {
      console.error("[fetchId error]", err);
      throw err;
    }
  };

  // loads all products and sets them to the state as the component renders
  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <SearchViewContext.Provider 
    value={{ 
      searchId, 
      setSearchId, 
      fetchId, 
      fetchAllProducts,
      setAllProducts,
      allProducts,
      setProductById,
      productById
    }}>
      {children}
    </SearchViewContext.Provider>
  );
};

export const useSearchView = () => {
  return useContext(SearchViewContext);
};
