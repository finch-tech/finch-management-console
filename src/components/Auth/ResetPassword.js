// @flow
import React, { Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { parse } from "query-string";

import type { AuthStore } from "../../stores";
import { Auth } from "../";

type Props = {
  authStore: AuthStore,
  history: Object,
  location: Object
};

@inject("authStore")
@observer
export class ResetPassword extends Component<Props> {
  @observable
  formData = {
    password: ""
  };

  @observable
  flash: Object;

  handleChange = (event: SyntheticInputEvent<EventTarget>) => {
    let formData = this.formData;

    switch (event.target.name) {
      case "password":
        formData.password = event.target.value;
        break;
    }

    this.formData = formData;
  };

  handleSubmit = async (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();

    const query = parse(this.props.location.search);
    const token = query.token;

    const { authStore } = this.props;

    try {
      await authStore.change_password(token, this.formData.password);
      this.props.history.push("/");
    } catch (error) {
      this.flash = {
        message: "Failed to change password",
        type: "red"
      };
      return;
    }
  };

  render() {
    const { loading } = this.props.authStore;

    return (
      <Auth>
        <div className="auth-container">
          <div className="auth-main">
            <h1 className="auth-title">Reset Your Password</h1>

            <p className="message">
              Almost completed! Please enter the new password below.
            </p>

            <form className="form-control" onSubmit={this.handleSubmit}>
              {this.flash && (
                <div className={`notify ${this.flash.type}`}>
                  {this.flash.message}
                </div>
              )}

              <label>
                <span className="input-name">New Password</span>
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
                Change Password
                <div className="loader" />
              </button>
            </form>
          </div>
        </div>
      </Auth>
    );
  }
}
