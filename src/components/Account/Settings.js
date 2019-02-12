// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { NavLink } from "react-router-dom";

import type { AuthStore } from "../../stores";

type Props = {
  authStore: AuthStore
};

@inject("authStore")
@observer
export class AccountSettings extends Component<Props> {
  delete = (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();
    this.props.authStore.delete();
  };

  render() {
    require("./scss/Settings.scss");

    const { account, loading } = this.props.authStore;

    return account ? (
      <div className="container">
        <NavLink to="/stores" className="btn-back">
          Back to Store List
        </NavLink>

        <div className="title">
          <h1>Account Settings</h1>
        </div>

        <div className="account-settings">
          <div className="account-content">
            <div className="content-box">
              <form className="form-control">
                <label>
                  <span className="input-name">Email</span>
                  <div className="read-only">{account.email}</div>
                </label>
              </form>
              <button
                onClick={this.delete}
                className={`btn danger ${loading && "loading"}`}
                type="submit"
                disabled={loading}
              >
                Delete Account
                <div className="loader" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="page-loader" />
    );
  }
}
