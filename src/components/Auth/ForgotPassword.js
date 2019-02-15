// @flow
import React, { Component } from "react";
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
export class ForgotPassword extends Component<Props> {
  @observable
  formData = {
    email: ""
  };

  @observable
  passwordReset = false;

  @observable
  flash: Object;

  handleChange = (event: SyntheticInputEvent<EventTarget>) => {
    let formData = this.formData;

    switch (event.target.name) {
      case "email":
        formData.email = event.target.value;
        break;
    }

    this.formData = formData;
  };

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const { authStore } = this.props;

    try {
      await authStore.reset_password(this.formData.email);
      this.passwordReset = true;
    } catch (error) {
      return;
    }
  };

  render() {
    const { loading } = this.props.authStore;
    let emailIcon = require("./../../assets/images/email_icon@2x.png");
    let lockIcon = require("./../../assets/images/lock_icon@2x.png");

    return (
      <Auth>
        <div className="auth-container">
          <div className="auth-main">
            {this.passwordReset ? (
              <div className="auth-box">
                <img
                  className="auth-icon"
                  src={emailIcon}
                  width="80"
                  height="80"
                />

                <p className="message">
                  Password reset sent! We&apos;ve just sent the instructions on
                  how to reset your password to email below.
                </p>

                <div className="notify blue">{this.formData.email}</div>
              </div>
            ) : (
              <div className="auth-box">
                <img
                  className="auth-icon"
                  src={lockIcon}
                  width="80"
                  height="80"
                />

                <p className="message">
                  Please enter the email address you registered with. We will
                  send you a link to reset your password.
                </p>

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

                  <button
                    className={`btn primary ${loading && "loading"}`}
                    type="submit"
                    disabled={loading}
                  >
                    Reset Password
                    <div className="loader" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </Auth>
    );
  }
}
