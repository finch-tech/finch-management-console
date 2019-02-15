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
export class SignUp extends Component<Props> {
  @observable
  formData = {
    email: "",
    password: ""
  };

  @observable
  signedUp = false;

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
      await authStore.signUp(this.formData.email, this.formData.password);
      this.signedUp = true;
    } catch (error) {
      this.flash = {
        message: "Failed to sign up",
        type: "red"
      };
      return;
    }
  };

  render() {
    const { loading } = this.props.authStore;
    let emailIcon = require("./../../assets/images/email_icon@2x.png");
    let logo = require("./../../assets/images/finch-logo@2x.png");

    return (
      <Auth>
        <div className="auth-container">
          <div className="auth-main">
            {!this.signedUp && (
              <div>
                <div className="logo">
                  <img src={logo} width="300" height="92" />
                </div>
                <h1 className="auth-title">
                  An Open Source Cryptocurrency Payment Processor
                </h1>
              </div>
            )}

            {this.signedUp ? (
              <div className="auth-box">
                <img
                  className="auth-icon"
                  src={emailIcon}
                  width="80"
                  height="80"
                />
                <p className="message">
                  We&apos;ve send you an activation mail. Please follow the link
                  in the mail to activate your account.
                </p>
                <div className="notify blue">{this.formData.email}</div>
              </div>
            ) : (
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
                  <button
                    className={`btn primary ${loading && "loading"}`}
                    type="submit"
                    disabled={loading}
                  >
                    Sign Up
                    <div className="loader" />
                  </button>
                </form>
              </div>
            )}
          </div>

          {!this.signedUp && (
            <div className="auth-footer">
              <p className="link-message">
                If you already have an account,{" "}
                <Link to="/login">login here.</Link>
              </p>
            </div>
          )}
        </div>
      </Auth>
    );
  }
}
