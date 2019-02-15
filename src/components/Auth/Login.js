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
  flash: Object;

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
      this.flash = {
        message: "Failed to login",
        type: "red"
      };
      return;
    }
  };

  render() {
    const { loading } = this.props.authStore;
    let logo = require("./../../assets/images/finch-logo@2x.png");

    return (
      <Auth>
        <div className="auth-container">
          <div className="auth-main">
            <div className="logo">
              <img src={logo} width="300" height="92" />
            </div>
            <h1 className="auth-title">
              An Open Source Cryptocurrency Payment Processor
            </h1>
            <div className="auth-box">
              <form className="form-control" onSubmit={this.handleSubmit}>
                {this.flash && (
                  <div className={`notify ${this.flash.type}`}>
                    {this.flash.message}
                  </div>
                )}

                <label>
                  <span className="input-name">Email</span>
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email"
                    value={this.formData.email}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  <span className="input-name">Password</span>
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
          </div>
          <div className="auth-footer">
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
