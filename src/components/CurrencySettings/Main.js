// @flow
import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";

import { EthSettings, BtcSettings } from "../../components";
import type { StoreStore } from "../../stores";

type Props = {
  storeStore: StoreStore,
  match: Object
};

@inject("storeStore")
@observer
export class CurrencySettingsMain extends Component<Props> {
  render() {
    require("./scss/Main.scss");

    const { store } = this.props.storeStore;
    const ethImg = require("../../assets/images/ethereum@2x.png");
    const btcImg = require("../../assets/images/bitcoin@2x.png");

    return (
      <div className="store-content">
        <div className="content-box">
          <h2 className="content-title">Curency Settings</h2>
          <p className="content-description">
            Setup how you want to receive your payment in cryptocurrency.
          </p>
        </div>

        <ul className="currency-settings-tab">
          <li>
            <NavLink to={`/stores/${store.id}/currency_settings/eth`}>
              <img src={ethImg} width="28" height="44" />
              <span className="name">Ethereum</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/stores/${store.id}/currency_settings/btc`}
            >
              <img src={btcImg} width="38" height="38" />
              <span className="name">Bitcoin</span>
            </NavLink>
          </li>
        </ul>
        <div className="content-box">
          <Switch>
            <Route
              exact
              path="/stores/:id/currency_settings"
              render={() => (
                <Redirect to={`/stores/${store.id}/currency_settings/eth`} />
              )}
            />
            <Route
              exact
              path={`/stores/${store.id}/currency_settings/eth`}
              render={props => <EthSettings storeId={store.id} {...props} />}
            />
            <Route
              exact
              path={`/stores/${store.id}/currency_settings/btc`}
              render={props => <BtcSettings storeId={store.id} {...props}/>}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
