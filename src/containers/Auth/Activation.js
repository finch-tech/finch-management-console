// @flow
import React, { Component } from "react";
import { observable } from "mobx";
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
  @observable
  error: Error;

  componentDidMount = async () => {
    const query = parse(this.props.location.search);
    const token = query.token;

    try {
      await this.props.authStore.activate(token);
      this.props.history.push("/");
    } catch (error) {
      this.error = error;
    }
  };

  render() {
    return <div className="page-loader" />;
  }
}
