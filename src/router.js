import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import App from "./App";

import { Login, Signup, StoreList } from "./containers";
import { AuthLoader } from "./components";

render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <AuthLoader>
          <Switch>
            <Route exact path="/" component={StoreList} />
          </Switch>
        </AuthLoader>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("app")
);
