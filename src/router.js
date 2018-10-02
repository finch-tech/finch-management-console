import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import App from "./App";
import {
  Main,
  Activation,
  ForgotPassword,
  ResetPassword,
  Login,
  SignUp,
  StoreList,
  StoreMain
} from "./components";
import { AuthLoader } from "./components";

render(
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign_up" component={SignUp} />
        <Route exact path="/activation" component={Activation} />
        <Route exact path="/forgot_password" component={ForgotPassword} />
        <Route exact path="/reset_password" component={ResetPassword} />
        <AuthLoader>
          <Main>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/stores" />} />

              <Route exact path="/stores/new" component={StoreList} />
              <Route path="/stores/:id" component={StoreMain} />

              <Route path="/stores" component={StoreList} />
            </Switch>
          </Main>
        </AuthLoader>
      </Switch>
    </App>
  </BrowserRouter>,
  document.getElementById("app")
);
