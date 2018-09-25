// @flow
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";

import type { AuthStore } from "../../stores";
import { Auth } from "../";

type Props = {
  authStore: AuthStore,
  history: Object
};

@inject("authStore")
@observer
export class Login extends Component<Props> {
  @observable
  formData = {
    email: "",
    password: ""
  };

  @observable
  error: Error;

  handleChange = (event: SyntheticInputEvent<EventTarget>) => {
    let formData = this.formData;

    switch (event.target.name) {
      case "email":
        formData.email = event.target.value;
        break;
      case "password":
        formData.password = event.target.value;
        break;
    }

    this.formData = formData;
  };

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const { authStore } = this.props;

    try {
      await authStore.login(this.formData.email, this.formData.password);
      this.props.history.push("/");
    } catch (error) {
      this.error = error;
      return;
    }
  };

  render() {
    const { loading } = this.props.authStore;

    return (
      <Auth>
        <div className="auth-container">
          <div className="main">
            <h1 className="auth-title">
              Accept Cryptocurrency Enhance Your Business.
            </h1>
            <form className="form-control" onSubmit={this.handleSubmit}>
              {this.error && <div className="notify red">Failed to login</div>}
              <label>
                <span>Email</span>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  value={this.formData.email}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <span>Password</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={this.formData.password}
                  onChange={this.handleChange}
                />
              </label>
              <div className="link">
                <Link className="forgot-password" to="/forgot_password">
                  Forgot Password?
                </Link>
              </div>
              <button
                className={`btn primary ${loading && "loading"}`}
                type="submit"
                disabled={loading}
              >
                Login
                <div className="loader" />
              </button>
            </form>
          </div>
          <div className="footer">
            <p className="link-message">
              If you don&apos;t have an account,{" "}
              <Link to="/sign_up">sign up here.</Link>
            </p>
          </div>
        </div>
      </Auth>
    );
  }
}
