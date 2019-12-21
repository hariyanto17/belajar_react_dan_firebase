import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/atom/Button";
import { loginUserAPI } from '../../../config/redux/action';
import { withRouter } from "react-router-dom";

class Login extends Component {

  state = {
    email: "",
    password: "",
    isLoading: false
  };

  handleChangeText = e => {
    // console.log(e.target.id);
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleLoginSubmit = async () => {
    const { email, password } = this.state;
    const { history } = this.props;
    const res = await this.props.loginAPI({ email, password }).catch(err => err);
    if (res) {
      console.log(res);
      localStorage.setItem('userData', JSON.stringify(res))
      this.setState({
        email: '',
        password: ''
      })
      console.log('login Success')
      history.push("/");
    } else {
      console.log('login failed')
    }
  }



  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
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
                          value={this.state.email}
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className="form-control form-control-user"
                          id="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChangeText}
                          placeholder="Password"
                        />
                      </div>
                      <div>
                        <Button onClick={this.handleLoginSubmit} title="Login" loading={this.props.isLoading} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading
})
const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data))
})


export default connect(reduxState, reduxDispatch)(withRouter(Login));
