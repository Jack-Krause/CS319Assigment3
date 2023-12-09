import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "..backend/app.js";

// Main page for app
function InitialAppView() {
  return (
    <>
      <div className="container-fluid vh-100 d-flex flex-column bg-grey">
        <header className="container-fluid bg-black text-white">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <h1>App Name Here</h1>
              <button>About</button>
            </div>
          </nav>
        </header>

        <main className="flex-grow-1">
          <div className="row flex-grow-1 bg-grey">
            <div className="col-md-8 text-black big">
              <p>Content</p>
            </div>
            <div className="col-md-8">
              <p>Content 2</p>
            </div>
          </div>
        </main>
        <footer className="footer py-3 bg-black text-white">
          <div className="container">
            <p>Footer Content</p>
          </div>
        </footer>
      </div>
    </>
  );
}

function Initial() {
  return (
    <>
      <InitialAppView />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Initial />
  </React.StrictMode>
);