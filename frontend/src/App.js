import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DeleteView from "./components/DeleteView";
import NavBar from "./components/DeleteView";
import PostView from "./components/PostView";
import ReadView from "./components/ReadView";
import StudentInfo from "./components/StudentInfo";
import UpdateView from "./components/UpdateView";
import "./index.css";

const App = () => {
  return (
    <Router>
        <div className = "App">
            <NavBar />
            <Switch>
                <Route path = "/" component = {ReadView} />
                <Route path = "/update" component = {UpdateView} />
                <Route path = "/post" component = {PostView} />
                <Route path = "/delete" componet = {DeleteView} />
            </Switch>
        </div>
    </Router>
  );
};

export default App;
