import React from "react";
import "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dasboard from "./../Dasboard/index";
import Login from "./../Login/index";
import Register from "./../Register/index";
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/Register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Dasboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
