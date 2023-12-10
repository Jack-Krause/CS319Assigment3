import React from "react";
import {getFromDb, getByIdFromDb} from "../services/ApiService";
import { useSearchView } from "../context/SearchViewContext";

const ReadView = () => {
  const { searchId, setSearchId } = useSearchView();


// handle specific searches or general GET request
  const handleInputChange = (event) => {
    setSearchId(event.target.value);
  }

  //
  const handleClick = async() => {
    if (searchId > 0) {
      getByIdFromDb(searchId);
    } else {
      console.log("invalid id");
      getFromDb();
    }
  }


  return (
    <div>
      <main>
        <div className="row">
          <div className="col-md-8">
            <input
              type = "text"
              value = {searchId}
              onChange = {handleInputChange}
              placeholder = "Search for id..."
            />
            <button onClick = {handleClick}>Search or Show Everything</button>
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
