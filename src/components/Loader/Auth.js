// @flow
import React, { type Node, Component } from "react";
import { Redirect, Route } from "react-router-dom";
import { observer, inject } from "mobx-react";

import type { AuthStore } from "../../stores";

type Props = {
  authStore: AuthStore,
  children: Node
};

@inject("authStore")
@observer
export class AuthLoader extends Component<Props> {
  render() {
    this.props.authStore.updateAuthenticationStatus();
    const { isAuthenticated } = this.props.authStore;

    return isAuthenticated ? (
      <Route>{this.props.children}</Route>
    ) : (
      <Redirect to={"/login"} />
    );
  }
}
