import React, {useState, useEffect} from "react";
import { useSearchView } from "../context/SearchViewContext";

const ReadView = () => {
  // context methods and values from SearchViewContext
  const { 
    searchId, 
    setSearchId, 
    fetchId, 
    fetchAllProducts,
    setAllProducts,
    allProducts,
    setProductById,
    productById
  } = useSearchView();

  // handle changing the context of what the user searched
  const handleInputChange = (event) => {
    setSearchId(event.target.value);
    handleSearching();
  };

  const handleSearching = async () => {

    try {
      if (searchId.trim() === '') {
        await fetchAllProducts();
        setProductById(null);
      } else {
        await fetchId(searchId);
        setAllProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main>
        <div className="row">
          <div className="col-md-8">
            <input
              type="text"
              value={searchId}
              onChange={handleInputChange}
              placeHolder="Show All Products"
            />
            <button onClick={handleSearching}>
              {searchId.trim() === '' 
              ? 'Show All Products'
              : isNaN(searchId) || !Number.isInteger(parseFloat(searchId))
              ? 'Enter an integer for ID'
              : `Show product ID: ${searchId}`}
              </button>
            <div id="productContainer">
              {searchId.trim() === '' ? (
                allProducts.map((product, index) => (
                  <div className="product-item" key={index}>
                    <h2>{product.title}</h2>
                    <p>Price: {product.price}</p>
                    <p>Description: {product.desciption}</p>
                    <p>Category: {product.category}</p>
                    <p>Rating: {product.rating}</p>
                  </div>
                ))
              ) : (
                productById && (
                <div className="product-item">
                  <h2>{productById.title}</h2>
                  <p>Price: {productById.price}</p>
                  <p>Description: {productById.description}</p>
                  <p>Category: {productById.category}</p>
                  <p>Rating: {productById.rating}</p>
                </div>
                )
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
          <p>Footer Content</p>
        </div>
      </footer>
    </div>
  );
};

export default ReadView;
