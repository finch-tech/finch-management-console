import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class App extends Component {
  render() {
    require("./scss/_reset.scss");
    return <div>{this.props.children}</div>;
  }
}
