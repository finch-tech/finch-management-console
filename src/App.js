// @flow
import React, { type Node, Component } from "react";
import { Provider } from "mobx-react";

import { RootStore } from "./stores";

type Props = {
  children: Node
};

const rootStore = new RootStore();

export default class App extends Component<Props> {
  render() {
    require("./scss/base.scss");

    return (
      <Provider rootStore={rootStore} authStore={rootStore.authStore}>
        {this.props.children}
      </Provider>
    );
  }
}
