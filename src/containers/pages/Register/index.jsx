import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import firebase from "../../../config/firebase";

class Register extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChangeText = e => {
    // console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleRegisterSubmit = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => {
        console.log(("success ": res));
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-primary mb-4">Login Page</h1>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="email"
                          name="email"
                          onChange={this.handleChangeText}
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          name="password"
                          onChange={this.handleChangeText}
                          placeholder="Password"
                        />
                      </div>
                      <button
                        type="submit"
                        onClick={this.handleRegisterSubmit}
                        className="btn btn-primary btn-user btn-block"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
