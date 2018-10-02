// @flow
import React, { type Node, Component } from "react";

type Props = {
  children: Node
};

export class AuthBase extends Component<Props> {
  render() {
    require("./scss/Base.scss");

    return <div id="auth">{this.props.children}</div>;
  }
}
