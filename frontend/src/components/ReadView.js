import React from "react";
import getFromDb from "../services/ApiService";

const ReadView = ({dataLoaded, setDataLoaded }) => {
  return (
    <div>
      <main>
        <div className="row">
          <div className="col-md-8">
            <button onClick = {getFromDb}>Show all Products</button>
            <pre id = "productContainer"></pre>
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
