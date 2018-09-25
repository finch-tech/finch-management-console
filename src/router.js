import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import App from "./App";
import { Activation, Login, SignUp, StoreList } from "./containers";
import { AuthLoader } from "./components";

render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign_up" component={SignUp} />
        <Route path="/activation" component={Activation} />
        <AuthLoader>
          <Switch>
            <Route path="/" component={StoreList} />
          </Switch>
        </AuthLoader>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("app")
);
