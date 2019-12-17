import React from "react";
// import logo from "../../../assets/img/logo/logo.svg";
import "./index.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dasboard from "./../Dasboard/index";
import Login from "./../Login/index";
import Register from "./../Register/index";

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/User">User</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/Register">
            <Register />
          </Route>
          <Route path="/User">
            <Login />
          </Route>
          <Route path="/">
            <Dasboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
