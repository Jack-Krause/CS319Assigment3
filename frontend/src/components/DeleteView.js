import React, { useState, useEffect } from "react";
import { useSearchView } from "../context/SearchViewContext";
import { deleteFromDb } from "../services/ApiService";

const DeleteView = () => {
  // context methods and values from SearchViewContext
  const [postStatusMessage, setPostStatusMessage] = useState("");
  const [productToDelete, setProductToDelete] = useState("");
  const {
    searchId,
    setSearchId,
    fetchId,
    fetchAllProducts,
    setAllProducts,
    allProducts,
    setProductById,
    productById,
  } = useSearchView();

  const handleDeleteFormSubmit = (event) => {
    event.preventDefault();

    if (validate) {
      deleteFromDb(productToDelete)
        .then((response) => {
          console.log("DELETE response success", response.data);
          setPostStatusMessage(
            "Deletion was a success! Check that your product was removed with a general search."
          );
          clearDeleteInputForm();
        })
        .catch((error) => {
          console.error("Deletion error", error);
          setPostStatusMessage("Error on product deletion. Make sure you used an ID");
        });
    } else {
      setPostStatusMessage("Invalid Input. Make sure you entered an integer.");
    }

  };

  const clearDeleteInputForm = () => {
    setProductToDelete("");
  }

  const validate = () => {
    return !productToDelete === '' ||
      !isNaN(parseFloat(productToDelete));
  };

  // handle changing the context of what the user searched
  const handleInputChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleDeleteFormModify = (event) => {
    setProductToDelete(event.target.value);
  };

  const handleSearching = async () => {
    try {
      if (searchId.trim() === "") {
        await fetchAllProducts();
        setProductById(null);
      } else {
        await fetchId(searchId);
        // setAllProducts([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main>
        <div className="container mt-5">
          <div className="jumbotron">
            <h1 className="display-4 text-center text-primary">
              Delete: Remove Our Products!
            </h1>
            <p className="lead text-center">
              Never want to see a specific item again? <br />
              Perfect. Delete it using it's ID.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <input
                type="text"
                value={searchId}
                onChange={handleInputChange}
                placeholder="Enter an ID"
                className="form-control m-1"
              />
              <button onClick={handleSearching} className="btn btn-primary m-3">
                {searchId.trim() === ""
                  ? "Show All Products"
                  : isNaN(searchId) || !Number.isInteger(parseFloat(searchId))
                  ? "Enter an integer for ID"
                  : `Show product ID: ${searchId}`}
              </button>
              <div id="productContainer">
                {productById ? (
                  <div className="card mb-3">
                    <div className="card-body">
                      <h2 className="card-title">
                        ID: {productById.id} {productById.title}
                      </h2>
                      <p className="card-text">Price: {productById.price}</p>
                      <img
                        src={productById.image}
                        alt={productById.title}
                        className="text-center medium-img card-img-top prod-img"
                      />
                      <p className="card-text text-center">
                        Description: {productById.description}
                      </p>
                      <p className="card-text">
                        Category: {productById.category}
                      </p>
                      <p className="card-text">Rating: {productById.rating}</p>
                    </div>
                  </div>
                ) : (
                  allProducts.map((product, index) => (
                    <div className="card mb-3" key={index}>
                      <div className="card-body">
                        <h2 className="card-title">
                          ID: {product.id} - {product.title}
                        </h2>
                        <p className="card-text">Price: {product.price}</p>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="medium-img card-img-top"
                        />
                        <p className="card-text">
                          Description: {product.description}
                        </p>
                        <p className="card-text">
                          Category: {product.category}
                        </p>
                        <p className="card-text">Rating: {product.rating}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
          <div className="row jsutify-content-center">
            <div className="col-md-8">
              <h2 className="display-4 text-center text-primary">
                Enter an id, and delete a product!
              </h2>
              <form onSubmit={handleDeleteFormSubmit}>
                <div className="form-floating">
                  <input type="text" id="id" name="id" value={productToDelete.id} onChange={handleDeleteFormModify} placeholder="Enter Integer ID" className="form-control md-3" />
                  <label htmlFor="title" className="form-label">
                    ID:
                  </label>
                  <button type="submit">Delete Product</button>
                </div>
              </form>
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

export default DeleteView;
