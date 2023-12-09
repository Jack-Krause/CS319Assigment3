import React from "react";
import { Link } from "react-router-dom";

const PostView = () => {
  return (
    <div>
      <main>
        <div className="row">
          <div className="col-md-8">
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

export default PostView;
