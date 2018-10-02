// @flow
import React, { type Node, Component } from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { BrowserRouter } from "react-router-dom";

import type { AuthStore } from "../stores";

type Props = {
  authStore: AuthStore,
  children: Node,
  history: Object
};

@inject("authStore")
@observer
export class Main extends Component<Props> {
  @observable
  accountTab: boolean = false;

  async componentDidMount() {
    if (!this.props.authStore.account) {
      await this.props.authStore.loadAccount();
    }
  }

  toggleAccountTab = (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();
    this.accountTab = !this.accountTab;
    if (this.accountTab) {
      const el: any = event.target.closest(".btn-account");

      const close = (e: SyntheticInputEvent<EventTarget>) => {
        if (el.contains(e.target)) return;
        this.accountTab = false;
        (document.body: any).removeEventListener("click", close);
      };
      (document.body: any).addEventListener("click", close);
    }
  };

  logout = (event: SyntheticInputEvent<EventTarget>) => {
    event.preventDefault();
    this.props.authStore.logout();
  };

  render() {
    const { account } = this.props.authStore;

    return account ? (
      <BrowserRouter>
        <div className="main">
          <header>
            <div className="status" />
            <button className="btn-account" onClick={this.toggleAccountTab}>
              <span>{this.props.authStore.account.email}</span>

              {this.accountTab && (
                <div className="account-tab">
                  <ul>
                    <li onClick={this.logout}>Logout</li>
                  </ul>
                </div>
              )}
            </button>
          </header>
          {this.props.children}
        </div>
      </BrowserRouter>
    ) : (
      <div className="page-loader" />
    );
  }
}
