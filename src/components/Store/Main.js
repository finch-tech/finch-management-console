// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import { PublicKeyMain, ApiKeyList, CurrencySettingsMain } from "../";

import type { StoreStore } from "../../stores";

type Props = {
  storeStore: StoreStore,
  match: Object
};

@inject("storeStore")
@observer
export class StoreMain extends Component<Props> {
  async componentDidMount() {
    const { id } = this.props.match.params;

    try {
      await this.props.storeStore.loadStore(id);
    } catch (error) {
      return;
    }
  }

  render() {
    require("./scss/Main.scss");

    const { id } = this.props.match.params;
    const { store } = this.props.storeStore;

    return store ? (
      <div className="container">
        <NavLink to="/stores" className="btn-back">
          Back to Store List
        </NavLink>

        <div className="title">
          <h1>
            {store.name}{" "}
            <span className="color" style={{ borderColor: store.color }} />
          </h1>
        </div>

        <p className="description">{store.description}</p>

        <div className="store-main">
          <ul className="nav">
            <li>
              <NavLink to={`/stores/${id}/public_key`}>Public Key</NavLink>
            </li>
            <li>
              <NavLink to={`/stores/${id}/api_keys`}>API Key</NavLink>
            </li>
            <li>
              <NavLink to={`/stores/${id}/currency_settings`}>
                Currency Settings
              </NavLink>
            </li>
          </ul>
          <Switch>
            <Route
              exact
              path="/stores/:id"
              render={() => <Redirect to={`/stores/${id}/public_key`} />}
            />
            <Route
              exact
              path="/stores/:id/public_key"
              component={PublicKeyMain}
            />
            <Route path="/stores/:id/api_keys" component={ApiKeyList} />
            <Route
              path="/stores/:id/currency_settings"
              component={CurrencySettingsMain}
            />
          </Switch>
        </div>
      </div>
    ) : (
      <div className="page-loader" />
    );
  }
}
