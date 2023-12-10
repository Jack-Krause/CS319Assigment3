import React, {useState, useEffect} from "react";
import { getFromDb, getByIdFromDb } from "../services/ApiService";
import { useSearchView } from "../context/SearchViewContext";

const ReadView = () => {
  // context methods and values from SearchViewContext
  const { searchId, setSearchId, fetchAllProducts, fetchId } = useSearchView();

  // handle changing the context of what the user searched
  const handleInputChange = (event) => {
    setSearchId(event.target.value);
    handleSearching();
  };

  const handleSearching = async () => {
    var container = document.getElementById("productContainer");
    container.innerHTML = "";
    try {
      var tempResponse = null;

      if (searchId > 0) {
        tempResponse = await fetchId(searchId);
      } else {
        tempResponse = await fetchAllProducts();
      }

      if (!tempResponse) {
        container.innerHTML = "Error with response";
      } else {
        tempResponse.forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product-item");
          productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <p>Price: ${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Category: ${product.category}</p>
            <p>Rating: ${product.rating}</p>
          `;
          container.appendChild(productDiv);
        });
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
            />
            <button onClick={handleSearching}>Search or Show Everything</button>
            <div id="productContainer">
            </div>
            <p>Content</p>
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
