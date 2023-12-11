import React, { useState, useEffect } from "react";
import { useSearchView } from "../context/SearchViewContext";
import { putToDb } from "../services/ApiService";

const UpdateView = () => {
  // context methods and values from SearchViewContext
  const [postStatusMessage, setPostStatusMessage] = useState("");
  const [updatedProduct, setUpdatedProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
    rating: "",
  });

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

  // handle changing the context of what the user searched
  const handleInputChange = (event) => {
    setSearchId(event.target.value);
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

  // Update the change to be sent that the user wants to make
  const handleUserFormChange = (event) => {
      const { name, value } = event.target;
      setUpdatedProduct({...updatedProduct, [name]: value});
  }

  // Check validity and send PUT request to ServiceApi
  const handleUserFormSubmit = (event) => {
    event.preventDefault();

    if (validate) {
      putToDb(updatedProduct)
        .then((response) => {
          console.log("PUT response success", response.data);
          setPostStatusMessage(
            "Put was a success! Search for the updated product using ID or general search."
          );
          clearInputForm();
        })
        .catch((error) => {
          console.error("Put error", error);
          setPostStatusMessage("Error on product update. Make sure you included an ID");
        });
    } else {
      setPostStatusMessage("Invalid Input. Make sure to include an ID");
    }
  };

  // Check that the id is valid and some value of updated product is changed
  const validate = () => {
    if (updatedProduct.id ==='' || !isNaN(parseFloat(updatedProduct.id))) {
      return false;
    }

    for (const key in updatedProduct) {
      if (key !== 'id' && updatedProduct[key] !== '') {
        return true;
      }
    }

    return false;
  };

    //Reset product state
    const clearInputForm = () => {
      setUpdatedProduct({
        id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        rating: "",
      });
    };

  return (
    <div>
      <main>
        <div className="container mt-5">
          <div className="jumbotron">
            <h1 className="display-4 text-center text-primary">
              Home: View Our Products!
            </h1>
            <p className="lead text-center">
              Explore our amazing products. <br />
              Try searching by an item's ID. Or leave the search bar empty and
              see everything!
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
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="display-4 text-center text-primary">
                Enter the id, and update any attribute(s) of a product.
              </h2>
              <form onSubmit={handleUserFormSubmit}>
                <div className="form-group">
                  <label htmlFor="id" className="form-label">
                    ID:
                  </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    value={updatedProduct.id}
                    onChange={handleUserFormChange}
                    placeholder="Enter Integer ID"
                    className="form-control mb-3"
                  />
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={updatedProduct.title}
                    onChange={handleUserFormChange}
                    placeholder="Enter Product Title"
                    className="form-control mb-3"
                  />
                  <label htmlFor="price" className="form-label">
                    Price:
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={updatedProduct.price}
                    onChange={handleUserFormChange}
                    placeholder="Enter Product Price"
                    className="form-control mb-3"
                  />
                  <label htmlFor="description" className="form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    id="description"
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleUserFormChange}
                    placeholder="Enter Description of Product"
                    className="form-control mb-3"
                  />
                  <label htmlFor="category" className="form-label">
                    Category:
                  </label>
                  <input
                    type="text"
                    id="category"
                    name="category"
                    value={updatedProduct.category}
                    onChange={handleUserFormChange}
                    placeholder="Enter Product Category"
                    className="form-control mb-3"
                  />
                  <label htmlFor="image" className="form-label">
                    Image URL:
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={updatedProduct.image}
                    onChange={handleUserFormChange}
                    placeholder="Enter URL of image"
                    className="form-control mb-3"
                  />
                  <label htmlFor="rating" className="form-label">
                    Rating (1-5):
                  </label>
                  <input
                    type="text"
                    id="rating"
                    name="rating"
                    value={updatedProduct.rating}
                    onChange={handleUserFormChange}
                    placeholder="Enter Product Rating"
                    className="form-control mb-3"
                  />
                  <button type="submit">Post Product</button>
                </div>
              </form>
              {postStatusMessage && (
                <div
                  className={`alert ${
                    postStatusMessage.includes("success")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {postStatusMessage}
                </div>
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

export default UpdateView;
