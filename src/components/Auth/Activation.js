// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { parse } from "query-string";

import type { AuthStore } from "../../stores";

type Props = {
  authStore: AuthStore,
  history: Object,
  location: Object
};

@inject("authStore")
@observer
export class Activation extends Component<Props> {
  componentDidMount = async () => {
    const query = parse(this.props.location.search);
    const token = query.token;

    try {
      await this.props.authStore.activate(token);
      this.props.history.push("/stores/new?flash=activation");
    } catch (error) {
      return;
    }
  };

  render() {
    return <div className="page-loader" />;
  }
}
