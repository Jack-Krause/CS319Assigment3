import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeleteView from "./components/DeleteView";
import NavBar from "./components/NavBar";
import PostView from "./components/PostView";
import ReadView from "./components/ReadView";
import StudentInfo from "./components/StudentInfo";
import UpdateView from "./components/UpdateView";
import "./index.css";

const App = () => {
    const [dataLoaded, setDataLoaded] = useState(false);

  return (
    <Router>
        <div className = "App">
            <NavBar />
            <Routes>
                <Route path = "/" element ={<ReadView
                    dataLoaded = {dataLoaded}
                    isDataLoaded = {setDataLoaded}
                />} />
                <Route path = "/update" element = {<UpdateView />} />
                <Route path = "/post" element = {<PostView />} />
                <Route path = "/delete" element = {<DeleteView />} />
                <Route path = "/about" element = {<StudentInfo />} />
            </Routes>
        </div>
    </Router>
  );
};

export default App;