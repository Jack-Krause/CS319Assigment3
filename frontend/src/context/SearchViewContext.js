import React, { createContext, useState, useContext } from "react";
import { getByIdFromDb, getFromDb } from "../services/ApiService";

const SearchViewContext = createContext();

export const SearchViewProvider = ({ children }) => {
  const [searchId, setSearchId] = useState(0);

  // Call ApiService method to send GET request
  const fetchAllProducts = async () => {
    try {
      const data = await getFromDb();
      return data;
    } catch (err) {
      console.error("[fetchAllProducts error]", err);
      throw err;
    }
  };

  // Call ApiService with id GET request
  const fetchId = async (id) => {
    try {
      const data = await getByIdFromDb(id);
      return data;
    } catch (err) {
      console.error("[fetchId error]", err);
      throw err;
    }
  };

  return (
    <SearchViewContext.Provider value={{ searchId, setSearchId }}>
      {children}
    </SearchViewContext.Provider>
  );
};

export const useSearchView = () => {
  return useContext(SearchViewContext);
};
