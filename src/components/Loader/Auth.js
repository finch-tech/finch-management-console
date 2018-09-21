import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false
    };
  }

  componentWillMount() {
    this.validateAuthentication(this.props);
  }

  componentWillUpdate(nextProps) {
    this.validateAuthentication(nextProps);
  }

  validateAuthentication(props) {
    // Check if logged in.
  }

  render() {
    return this.state.isAuthenticated ? (
      <Route children={this.props.children} />
    ) : (
      <Redirect to={"/login"} />
    );
  }
}
