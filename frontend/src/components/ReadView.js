import React from "react";
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
    try {
      let products = null;

      if (searchId > 0) {
        products = await fetchId(searchId);
      } else {
        products = await fetchAllProducts();
      }

      if (products) {
        var mainContainer = document.getElementById("productContainer");
        mainContainer.innerHTML = "";

        for (var i = 0; i < products.length; i++) {
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
              placeholder="Search for id..."
            />
            <button onClick={handleSearching}>Search or Show Everything</button>
            <pre id="productContainer"></pre>
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
