import React, { Component } from "react";
import { Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        Wrapper
        {this.props.children}
      </div>
    );
  }
}
